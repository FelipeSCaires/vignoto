/**
 * @name * JetBrowser
 * @file * jetbrowser.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * javascript module to detect device & browser
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetBrowser {

    /**
	 * create a jetbrowser
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetBrowser.extend(options)
        this.userAgent = navigator.userAgent
        this.vendor = navigator.vendor
        this.browser
        this.device
        this.orientation
        this.touch
        this.eventTimeout
        this.chrome
        this.firefox
        this.safari
        this.opera
        this.edge
        this.ie

        this.init()
        this.config.onInit()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @returns {object} - custom jetbrowser settings
	 */
	static extend(options) {
		const settings = {
            onInit: () => {},
            onDetect: (data) => {}
		}

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
    }

    /**
	 * public function to detect
     * browser name
	 */
    browserName() {
        this.isChrome()
        this.isFirefox()
        this.isSafari()
        this.isOpera()
        this.isEdge()
        this.isIe()

        return this.browser
    }

    /**
	 * public function to detect
     * device type
     * @returns {string} - the device type
	 */
    deviceType() {
        if (/Mobi|Android/i.test(this.userAgent)) {
            this.device = 'mobile'
        } else {
            this.device = 'desktop'
        }

        return this.device
    }

    /**
	 * private function to add
     * browser class
     * @param {string} className - name of the class
	 */
    addClass(className) {
        document.documentElement.classList.add(`jetbrowser__${className}`)
    }

    /**
	 * private function to remove
     * browser class
     * @param {string} className - name of the class
	 */
    removeClass(className) {
        document.documentElement.classList.remove(`jetbrowser__${className}`)
    }

    /**
	 * private function to detect
     * if is chrome
     * @returns {string} - returns if is chrome
	 */
    isChrome() {
        if (/Chrome/.test(this.userAgent) && /Google Inc/.test(this.vendor)) {
            this.browser = 'chrome'
            this.chrome = true
        }

        return this.chrome
    }

    /**
	 * private function to detect
     * if is firefox
     * @returns {string} - returns if is firefox
	 */
    isFirefox() {
        if (typeof InstallTrigger !== 'undefined') {
            this.browser = 'firefox'
            this.firefox = true
        }

        return this.firefox
    }

    /**
	 * private function to detect
     * if is safari
     * @returns {string} - returns if is safari
	 */
    isSafari() {
        if (/constructor/i.test(window.HTMLElement) || ((p) => { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof this.safari !== 'undefined' && this.safari.pushNotification))) {
            this.browser = 'safari'
            this.safari = true
        }

        return this.safari
    }

    /**
	 * private function to detect
     * if is opera
     * @returns {string} - returns if is opera
	 */
    isOpera() {
        if ((!!window.opr && !!opr.addons) || !!window.opera || this.userAgent.indexOf(' OPR/') >= 0) {
            this.browser = 'opera'
            this.opera = true
        }

        return this.opera
    }

    /**
	 * public function to detect
     * if is edge
     * @returns {string} - returns if is edge
	 */
    isEdge() {
        if (!this.isIe() && !!window.StyleMedia) {
            this.browser = 'edge'
            this.edge = true
        }

        return this.edge
    }

    /**
	 * public function to detect
     * if is ie
     * @returns {string} - returns if is ie
	 */
    isIe() {
        if (false || !!document.documentMode) {
            this.browser = 'ie'
            this.ie = true
        }

        return this.ie
    }
      
    /**
	 * public function to get screen
     * orientation
     * @returns {string} - returns the device orientation
	 */
    getOrientation() {
        if (window.innerHeight > window.innerWidth) {
            this.orientation = 'portrait'
            this.removeClass('landscape')
            this.addClass('portrait')
        } else {
            this.orientation = 'landscape'
            this.removeClass('portrait')
            this.addClass('landscape')
        }

        return this.orientation
    }

    /**
	 * public function to detect
     * if is touch device
     * @returns {string} - returns if is the device is touch enable
	 */
    isTouch() {
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            this.touch = 'touchevents'
            this.removeClass('no-touchevents')
            this.addClass('touchevents')
        } else {
            this.touch = 'no-touchevents'
            this.removeClass('touchevents')
            this.addClass('no-touchevents')
        }

        return this.touch
    }

    /**
	 * private function to detect
     * resize event
	 */
    resize() {
        if (!this.eventTimeout) {
            this.eventTimeout = setTimeout(() => {
                this.eventTimeout = null
                
                this.getOrientation()
            }, 250)
        }
    }

    /**
	 * initialize instance
	 */
    init() {
        window.onresize = this.resize.bind(this)

        this.browserName()
        this.deviceType()
        this.addClass(this.browser)
        this.addClass(this.device)
        this.getOrientation()
        this.isTouch()
        this.resize()

        this.config.onDetect({
            'browser': this.browser,
            'device': this.device,
            'orientation': this.orientation
        })
	}

}