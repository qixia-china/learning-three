interface ApiResponse<T> {
  code: number;
  data: T;
}

function login(username: string, password: string): Promise<ApiResponse<string>> {
  // 模拟登录请求
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        resolve({ code: 200, data: '登录成功' });
      } else {
        resolve({ code: 401, data: '用户名或密码错误' });
      }
    }, 1000);
  });


}


export default login;
