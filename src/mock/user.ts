import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/v1/public/user/login',
    method: 'get',
    response: ({ query }) => {
      if (query.username == 'admin') {
        return {
          code: 200,
          data: {
            id: '123456789',
            name: 'admin',
            token: 'hellothisistoken'
          }
        }
      }
      return {
        code: 403,
        msg: '密码错误'
      }
    }
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben'
      }
    }
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    }
  }
] as MockMethod[]

// export default function (config: MockConfig) {
//   return [
//     {
//       url: '/api/text',
//       method: 'post',
//       rawResponse: async (req, res) => {
//         let reqbody = ''
//         await new Promise((resolve) => {
//           req.on('data', (chunk) => {
//             reqbody += chunk
//           })
//           req.on('end', () => resolve(undefined))
//         })
//         res.setHeader('Content-Type', 'text/plain')
//         res.statusCode = 200
//         res.end(`hello, ${reqbody}`)
//       }
//     }
//   ]
// }
