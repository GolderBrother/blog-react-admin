// 在线切换主题
module.exports = {
  navTheme: 'dark', // theme for nav menu 菜单的主题
  primaryColor: '#1890FF', // primary color of ant design Ant Design 的主色调
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu  菜单的布局，值为 sidemenu 菜单显示在左侧，值为 topmenu 菜单显示在顶部
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu 内容的布局 Fixed 为定宽到1200px ，Fluid 为流式布局。
  fixedHeader: false, // sticky header 内容的布局 Fixed 为定宽到1200px ，Fluid 为流式布局。
  autoHideHeader: false, // auto hide header 下滑时自动隐藏页头
  fixSiderbar: false, // sticky siderbar 固定菜单
};
