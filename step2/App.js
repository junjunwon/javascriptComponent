import {Component} from './Component.js'

/**
 * 컴포넌트 코드의 사용 방법을 강제할 수 있어 코드를 유지보수하고 관리할 때 이롭다고 한다.
 */
class App extends Component {
	setup() {
		this.$state = {items: ['item1', 'item2']}
	}
	template() {
		const {items} = this.$state
		return `
			<ul>
				${items.map(item => `<li>${item}</li>`).join('')}
			</ul>
			<button>추가</button>
		`
	}

	setEvent() {
		this.$target.querySelector('button').addEventListener('click', () => {
			const {items} = this.$state;
			this.setState({ items : [...items, `item${items.length + 1}`]})
		})
	}
}

new App(document.querySelector('#app'));