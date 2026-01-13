// 简化版渲染系统 - 仅用于 simpcity.cr
;(function () {
	// 解析 URL 参数
	const urlParams = new URLSearchParams(window.location.search)
	const site = urlParams.get('site') || 'default'
	const format = urlParams.get('format')
	const gender = urlParams.get('gender')
	const char = urlParams.get('char') || 'zoey'

	// 获取广告位配置
	let placement = window.PlacementConfig[site] || window.PlacementConfig['default']
	
	if (!placement) {
		console.error('未找到广告位配置:', site)
		placement = window.PlacementConfig['default']
	}

	// 获取创意集
	const creativeSet = window.Creatives[placement.creative]
	if (!creativeSet || !creativeSet.variants) {
		console.error('未找到创意集:', placement.creative)
		return
	}

	// 获取尺寸
	let width = placement.width
	let height = placement.height
	if (format) {
		const [formatWidth, formatHeight] = format.split('x').map(Number)
		if (formatWidth && formatHeight) {
			width = formatWidth
			height = formatHeight
		}
	}

	// 选择变体（单一创意，无需 A/B 测试）
	const variantNames = Object.keys(creativeSet.variants)
	const variant = variantNames[0] // 使用第一个（也是唯一的）变体
	const creative = creativeSet.variants[variant]

	if (!creative) {
		console.error('未找到创意变体:', variant)
		return
	}

	// 构建点击 URL（用于视频创意）
	let clickUrl = ''
	if (creative.video) {
		clickUrl = `https://nakedher.com?utm_source=${encodeURIComponent(site)}&utm_medium=video&utm_campaign=${encodeURIComponent(variant)}`
		if (gender) {
			clickUrl += `&gender=${encodeURIComponent(gender)}`
		}
	}

	// 获取容器并设置尺寸
	const container = document.getElementById('creativeSlot')
	if (!container) {
		console.error('未找到容器元素: creativeSlot')
		return
	}

	container.style.width = width + 'px'
	container.style.height = height + 'px'

	// 渲染创意
	let creativeHTML = ''

	if (creative.iframe) {
		// 渲染 iframe 创意
		let iframeSrc = `${creative.iframe}?site=${encodeURIComponent(site)}&ref=${encodeURIComponent(site)}&char=${encodeURIComponent(char)}`
		if (gender) {
			iframeSrc += `&gender=${encodeURIComponent(gender)}`
		}

		creativeHTML = `
			<iframe 
				src="${iframeSrc}"
				width="${width}" 
				height="${height}"
				frameborder="0"
				style="border: none; overflow: hidden; border-radius: 8px;"
				data-variant="${variant}" 
				data-site="${site}" 
				data-creative="${placement.creative}"
				data-type="iframe"
				allow="autoplay; fullscreen; picture-in-picture"
				allowfullscreen
			></iframe>
		`
	} else if (creative.video) {
		// 渲染视频创意
		creativeHTML = `
			<a href="${clickUrl}" target="_blank" 
			   data-variant="${variant}" 
			   data-site="${site}" 
			   data-creative="${placement.creative}"
			   data-type="video">
				<video 
					id="mainVideo-${variant}"
					width="${width}" 
					height="${height}" 
					autoplay 
					muted 
					loop 
					playsinline
					preload="auto"
					oncontextmenu="return false"
				>
					<source src="${creative.video}" type="video/mp4">
				</video>
			</a>
		`

		// 处理视频事件
		setTimeout(() => {
			const video = container.querySelector('video')
			if (video) {
				video.addEventListener('error', function () {
					console.log('视频加载失败:', creative.video)
				})

				video.addEventListener('loadedmetadata', function () {
					video.play().catch(function (error) {
						console.log('自动播放被阻止:', error)
					})
				})
			}
		}, 100)
	}

	container.innerHTML = creativeHTML

	// 记录渲染信息
	console.log('成功渲染创意:', {
		site: site,
		creative: placement.creative,
		variant: variant,
		width: width,
		height: height,
		type: creative.iframe ? 'iframe' : 'video'
	})

	// 暴露调试信息
	window.iframeTestDebug = {
		site: site,
		placement: placement,
		creative: creative,
		variant: variant,
		width: width,
		height: height,
		renderType: creative ? (creative.iframe ? 'iframe' : 'video') : 'unknown'
	}
})()

