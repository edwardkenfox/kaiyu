class ActionLogFilter
  def initialize

  end

  def generate(rawlogs=nil)
    logs = rawlogs || gen_logs

    user_to_node_hash = {}

    groups = logs.map do |log|
      log[:user_status]
    end.uniq

    nodes = logs.map do |log|
      { path: log[:url], groups: groups.map { | status | gen_empty_node(status) }}
    end.uniq

    filtered = []
    logs.each do | log |
      filtered_logs = gen_filtered_log_and_update_pathes(log, nodes, groups, user_to_node_hash)
      filtered.concat(filtered_logs)
    end
    filtered
  end

  private
  def gen_empty_node(status)
    { status: status, value: 0, users: Set.new {}}
  end

  def gen_logs
    logs = []
    logs.push gen_log("1", Time.parse('2016-10-01 00:00:00').to_i + 10, "/",      "free")
    logs.push gen_log("1", Time.parse('2016-10-01 00:00:00').to_i + 20, "/pageA", "free")
    logs.push gen_log("2", Time.parse('2016-10-01 00:00:00').to_i + 30, "/pageB", "payment")
    logs.push gen_log("3", Time.parse('2016-10-01 00:00:00').to_i + 35, "/pageC", "payment")
    logs.push gen_log("2", Time.parse('2016-10-01 00:00:00').to_i + 40, "/pageC", "payment")
    logs.push gen_log("2", Time.parse('2016-10-01 00:00:00').to_i + 50, "/pageC", "payment")
    logs.push gen_log("2", Time.parse('2016-10-01 00:00:00').to_i + 60, "/",      "payment")
    return logs
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
    return logs
  end

  def gen_log(user_id, time, url, status)
    {
      "user_id": user_id,
      "time": time,
      "url": url,
      "status": status
    }
  end
end
