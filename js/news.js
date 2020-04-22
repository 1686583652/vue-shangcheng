window.onload = function () {
  var obj = new Vue({
    el: "#app",
    data: {
      // message: "这是个vue"
      url: "http://47.96.117.121:7001/news/page",
      list: [],
      pageNo: 0,
      pageSize: 5,
      endOfScreen: false
    },
    //定义各种函数
    methods: {
      //定义网络请求函数
      loadData(pageNo, pageSize) {
        fetch(this.url + "/" + pageNo + "/" + pageSize)
          .then(res => {
            //坑
            return res.json()
          })
          .then(res => {
            // console.log(res.data)
            for (let i in res.data) {
              if (res.data[i].img) {
                var reg = new RegExp("127.0.0.1", "g")
                res.data[i].img = res.data[i].img.replace(reg, "47.96.117.121")
              }
              this.list.push(res.data[i])
            }
            this.endOfScreen = false
            console.log(this.list)
          })
      },
      //加载更多
      loadMore() {
        this.endOfScreen = this.checkHeight()
        console.log(this.endOfScreen)
        if (this.endOfScreen) {
          this.pageNo += 1
          this.loadData(this.pageNo, this.pageSize)
        }
      },
      //检测高度函数
      checkHeight() {
        window.onscroll = () => {
          //document.documentElement.clientHeight 页面可视化高度;document.documentElement.offsetHeight指的是html的高度
          var pageHeight = document.documentElement.clientHeight + window.scrollY
          // document.documentElement.clientTop
          console.log(pageHeight, document.documentElement.offsetHeight)
          //整个页面滚动完了
          if (pageHeight == document.documentElement.offsetHeight) {
            this.pageNo += 1
            this.loadData(this.pageNo, this.pageSize)
          }
        }
      },

    },
    //生命周期函数
    mounted() {
      this.loadData(this.pageNo, this.pageSize)
      this.checkHeight()
    }
  })
}