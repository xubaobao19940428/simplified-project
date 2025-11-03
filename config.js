// 简化版创意定义 - 仅用于 simpcity.cr
window.Creatives = {
  // 默认创意（回退）
  'default': {
    variants: {
      '300x250-general': { video: 'https://static.ourdream.ai/300x250-GENERAL.mp4' }
    }
  },
  
  // SimpCity 使用的信息流创意
  'feed-v2-300x250': {
    variants: {
      'i-feed-v2': { iframe: './feed-v2.html' }
    }
  }
};

// 简化版广告位配置 - 仅用于 simpcity.cr
window.PlacementConfig = {
  // SimpCity 站点配置
  '0e81-844ee50c3eb5': { width: 300, height: 250, creative: 'feed-v2-300x250' },
  'c0e3-d880f95ee28f': { width: 300, height: 250, creative: 'feed-v2-300x250' },
  
  // 默认回退（也使用 iframe，方便测试）
  'default': { width: 300, height: 250, creative: 'feed-v2-300x250' }
};

