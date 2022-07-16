import Items from './components/Items.js'

/**
 * component 이벤트 버블링 적용
 */
class App {
	constructor() {
		const $app = document.querySelector('#app');
		new Items($app);
	}
}

new App()