// 监听主线程发来的消息
self.onmessage = function (e) {
  const data = e.data
  const TOTAL = data.total
  // 假设这里执行一个耗时的计算任务
  console.log('设置数据', data)
  const result = [
    ...Array.from({
      length: 30,
    }).map((_, i) => {
      const row = {
        id: i,
        index: i,
        timestamp: '2023-10-01 12:00:00' + i,
        action: '新增',
        status: 'success',
        dataSize: 100,
        duration: 100,
        ip: '192.168.1.1',
        note: '备注信息',
      }
      return row
    }),
    ...Array.from({
      length: TOTAL - 10,
    }).map((_, i) => {
      const row = {
        id: i,
        index: i,
        timestamp: '2023-10-01 12:00:00' + i,
        action: '新增新增新增新增新增新增新增新增新增新增新增',
        status: 'success',
        dataSize: 100,
        duration: 100,
        ip: '192.168.1.1192.168.1.1192.168.1.1192.168.1.1192.168.1.1',
        note: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息',
      }
      return row
    }),
  ]
  // 将计算结果发送回主线程
  self.postMessage(result)
  self.close() // 关闭worker
}
