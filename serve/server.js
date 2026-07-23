import { WebSocketServer } from 'ws'

const PORT = 3001
const INTERVAL_MS = 100 // 每秒10条 = 每100ms一条
const BATCH_SIZE = 10

const wss = new WebSocketServer({ port: PORT })

console.log(`WebSocket 服务已启动 → ws://localhost:${PORT}`)

wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress
  console.log(`[连接] 客户端 ${clientIp} 已连接`)

  let seq = 0
  let batchSeq = 0

  // 每秒发送10条数据（每100ms一条）
  const timer = setInterval(() => {
    if (ws.readyState !== ws.OPEN) {
      clearInterval(timer)
      return
    }

    batchSeq++
    const timestamp = new Date().toISOString()

    const payload = {
      batch: batchSeq, // 当前秒内的序号 (1-10)
      seq: ++seq, // 全局递增序号
      timestamp,
      data: {
        value: +(Math.random() * 100).toFixed(2),
        category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        message: `模拟数据 #${seq}`,
      },
    }

    ws.send(JSON.stringify(payload))
  }, INTERVAL_MS)

  // 每10条（即每秒）打印一次汇总
  const logTimer = setInterval(() => {
    console.log(`[发送] 客户端 ${clientIp} | 已发送 ${seq} 条 | 当前批次 ${batchSeq}`)
  }, 1000)

  ws.on('close', () => {
    clearInterval(timer)
    clearInterval(logTimer)
    console.log(`[断开] 客户端 ${clientIp} 已断开 | 共发送 ${seq} 条`)
  })

  ws.on('error', (err) => {
    console.error(`[错误] 客户端 ${clientIp}:`, err.message)
    clearInterval(timer)
    clearInterval(logTimer)
  })

  ws.on('message', (raw) => {
    console.log(`[收到] 客户端 ${clientIp}:`, raw.toString())
  })
})

wss.on('error', (err) => {
  console.error('[服务器错误]', err.message)
})
