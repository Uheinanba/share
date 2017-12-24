### 组件分类
1. view 入口页面, 和路由对应。
2. global component (例如: toast,alert单例模式) 具备全局性,不从属 哪个view。思路和vuex进行结合, 派发全局的action。
3. simple component UI组件, 一般的组件库提供的组件。通过$emit/$on,v-model, .sync和外界进行交互。
  3.1 有自己行为的UI组件, Select, Dropdown
  3.2 布局组件
4. complex component 复杂组件, 多个组件进行组合。
  4.1: container component 和vuex进行交互把数据传递给simple component
  4.2: 多个component聚合

### axios封装
1. api 一致性处理
  ```
    if (opt.method === 'post') {
      axiosOpt.data = opt.payload
    } else if (opt.method === 'get') {
      axiosOpt.params = opt.payload
    }
    if (opt.withFile) {
      Object.assign(axiosOpt, { headers: {
        'Content-Type': 'multipart/form-data'
      }})
    }
  ```
2. 使用 vuex 进行全局 loading处理
```
  try {
    // 开始请求
    store.dispatch('showLoading', {
      text: '加载数据中'
    });
    const result = await axios(axiosOpt)

    if (result.status === 200 && result.statusText === 'OK') {
      if (result.data.success) {
        return result.data.results || true
      } else {
        // 请求失败的 toast
        store.dispatch('showAlert', {
          type: 'error',
          text: `请求失败${result.data.message ? `,信息：${result.data.message}`: ''}`
        })
        return false
      }
    } else {
      return false
    }
  } catch(e) {
    // 请求失败的 toast
    store.dispatch('closeLoading')
    store.dispatch('showAlert', {
      type: 'error',
      text: '请求失败'
    })
    return false
  }
```
