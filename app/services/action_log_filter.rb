class ActionLogFilter
  def filter_logs(rawlogs)
    user_to_node_hash = {}

    groups = rawlogs.map { |e| e["user_status"] }.uniq
    nodes  = rawlogs.map do |log|
      { path: log["url"], groups: groups.map { |status| gen_empty_node(status) }}
    end.uniq

    filtered = []

    rawlogs.each do |log|
      filtered_logs = gen_filtered_log_and_update_pathes(log, nodes, groups, user_to_node_hash)
      filtered.concat(filtered_logs)
    end

    filtered
  end

  private

  def gen_empty_node(status)
    { status: status, value: 0, users: Set.new {} }
  end

  def gen_filtered_log_and_update_pathes(log, nodes, groups, user_to_node_hash)
    logs = []
    p = nodes.select { |path| path[:path] == log[:url] }
    g = p.last[:groups].select { |group| group[:user_status] == log[:user_status] }

    # delete if user transit

    if prevent_node = user_to_node_hash[log[:user_id]]
      # already exist other node
      pathIndex = prevent_node[:pathIndex]
      groupIndex = prevent_node[:groupIndex]
      movedValue = nodes[pathIndex][:groups][prevent_node[:groupIndex]][:value] -= 1
      logs.push({group: groupIndex, type: "update", path: nodes[prevent_node[:pathIndex]][:path], value: movedValue, time: log[:timestamp]})
      logs.push({group: groupIndex, type: "move", from: nodes[prevent_node[:pathIndex]][:path], to: log[:url], value: 1, time: log[:timestamp]})
    end
    # move type event if user transit

    # update
    pathIndex = nodes.index { |path| path[:path] == log[:url] }
    groupIndex = groups.index { |group| group == log[:user_status]}
    value = nodes[pathIndex][:groups][groupIndex][:value] += 1
    nodes[pathIndex][:groups][groupIndex][:users].add log[:user_id]
    user_to_node_hash[log[:user_id]] = {pathIndex: pathIndex, groupIndex: groupIndex}

    logs.push({group: groupIndex, type: "update", path: log[:url], value: value, time: log[:timestamp]})

    logs
  end
end
