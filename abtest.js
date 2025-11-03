// 简化版 A/B 测试系统（保留基础功能，但不使用）
// 如果未来需要 A/B 测试，可以取消注释并使用
window.ABTest = {
  // 哈希函数
  hashCode: function(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  },

  // 获取用户 ID
  getUserId: function() {
    let userId = localStorage.getItem('ab_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ab_user_id', userId);
    }
    return userId;
  },

  // 分配变体（简化版，仅支持动态权重）
  assignVariant: function(testName, weights) {
    const KEY = `abtest_${testName}`;
    let variant = localStorage.getItem(KEY);
    if (variant) {
      return variant;
    }

    const userId = this.getUserId();
    const testKey = testName + '_' + userId;
    const hash = this.hashCode(testKey);
    const bucket = hash % 100;
    
    const variantNames = Object.keys(weights);
    let cumulativeWeights = [];
    let total = 0;
    
    for (const name of variantNames) {
      total += weights[name];
      cumulativeWeights.push({ name, threshold: total });
    }
    
    variant = variantNames[0];
    for (const item of cumulativeWeights) {
      if (bucket < item.threshold) {
        variant = item.name;
        break;
      }
    }
    
    localStorage.setItem(KEY, variant);
    return variant;
  }
};


