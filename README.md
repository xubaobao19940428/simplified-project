# SimpCity 简化版广告系统

这是专为 **simpcity.cr** 站点简化的广告投放系统。

## 📁 文件结构

```
simplified-project/
├── config.js          # 创意和广告位配置（简化版）
├── render.js          # 渲染逻辑（简化版，去除复杂功能）
├── abtest.js          # A/B 测试（保留但未使用）
├── iframe.html        # 广告容器页面
├── index.html         # 外层框架页面
├── feed-v2.html       # 实际广告内容（需要从原项目复制）
└── README.md          # 本说明文件
```

## 🔧 简化内容对比

### 原版 vs 简化版

| 文件 | 原版 | 简化版 | 说明 |
|------|------|--------|------|
| `config.js` | 268 行，60+ 站点 | 28 行，2 个站点 | 只保留 SimpCity 相关配置 |
| `render.js` | 396 行 | ~130 行 | 去除多实例检测、复杂 A/B 测试、旧格式支持 |
| `abtest.js` | 151 行 | ~70 行 | 保留基础功能但未使用 |
| `iframe.html` | 169 行 | ~50 行 | 去除调试功能 |

## 🚀 使用方法

### 1. 复制必要文件

从原项目复制以下文件到 `simplified-project` 目录：

```bash
# 必需的广告内容文件
cp feed-v2.html simplified-project/

# 如果使用追踪功能，复制追踪脚本
cp beacon.min.js simplified-project/
cp beacon\(1\).min.js simplified-project/

# 如果广告中有图片资源，也需要复制
cp *.avif simplified-project/
```

### 2. 修改配置

编辑 `config.js` 中的以下内容：

- **视频 CDN 地址**：修改 `default` 创意中的视频 URL
- **目标链接**：在 `render.js` 中修改点击跳转的 URL（当前是 `ourdream.ai`）
- **追踪端点**：如果使用追踪，修改 `iframe.html` 中的追踪脚本配置

### 3. 部署

将所有文件上传到你的服务器或 CDN。

## 📝 配置说明

### SimpCity 站点 ID

- `0e81-844ee50c3eb5` - 主要站点 ID
- `c0e3-d880f95ee28f` - 备用站点 ID

### 广告创意

- `feed-v2-300x250` - 使用 `feed-v2.html` 作为创意内容
- 尺寸：300x250 像素

## ⚙️ 自定义配置

### 修改目标链接

编辑 `render.js`，找到以下代码并修改：

```javascript
// 视频创意的点击链接
clickUrl = `https://your-domain.com?ref=${encodeURIComponent(site)}&source=ad&variant=${encodeURIComponent(variant)}`

// iframe 创意的链接在 feed-v2.html 中修改
```

### 添加新的站点

在 `config.js` 的 `PlacementConfig` 中添加：

```javascript
'your-site-id': { width: 300, height: 250, creative: 'feed-v2-300x250' }
```

### 添加新的创意类型

在 `config.js` 的 `Creatives` 中添加：

```javascript
'your-creative-name': {
  variants: {
    'variant-name': { iframe: './your-creative.html' }
  }
}
```

然后在 `PlacementConfig` 中引用它。

## 🔍 调试

### 查看渲染信息

打开浏览器控制台，会看到渲染日志：

```
成功渲染创意: {
  site: "0e81-844ee50c3eb5",
  creative: "feed-v2-300x250",
  variant: "i-feed-v2",
  width: 300,
  height: 250,
  type: "iframe"
}
```

### 检查配置

在浏览器控制台输入：

```javascript
// 查看当前配置
console.log(window.PlacementConfig)
console.log(window.Creatives)

// 查看渲染信息
console.log(window.iframeTestDebug)
```

## ⚠️ 注意事项

1. **必需文件**：确保 `feed-v2.html` 存在于同一目录
2. **资源路径**：检查 `feed-v2.html` 中的资源路径是否正确
3. **跨域问题**：如果从不同域名加载，注意 CORS 配置
4. **追踪脚本**：如果不需要追踪，可以删除 `iframe.html` 中的追踪脚本引用

## 📊 性能优化

简化版已经优化：

- ✅ 去除不必要的验证逻辑
- ✅ 去除多实例检测（单站点不需要）
- ✅ 去除复杂的 A/B 测试逻辑
- ✅ 去除调试功能
- ✅ 代码体积减少 ~60%

## 🔄 升级说明

如果未来需要：

- **添加 A/B 测试**：修改 `config.js` 添加多个变体，然后在 `render.js` 中使用 `window.ABTest.assignVariant()`
- **支持多个站点**：在 `config.js` 中添加更多站点配置
- **支持视频创意**：在 `config.js` 中添加视频创意配置

## 📞 支持

如有问题，检查：

1. 浏览器控制台的错误信息
2. 网络请求是否成功加载
3. 文件路径是否正确
4. 配置是否正确匹配

