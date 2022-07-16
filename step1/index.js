/**
 * 코드의 핵심
 * state가 변경되면 render를 실행한다
 * state는 setState로만 변경해야 한다.
 * 이러한 규칙을 지키면서 코드를 직성하면 브라우저에 출력되는 내용은 무조건 state에 종속된다고 한다! 즉 DOM을 직접적으로 다룰 필요가 없어지는게 포인트!!
 * 
 */
const $app = document.querySelector('#app')

let state = {
	items : ['item1', 'item2', 'item3', 'item4']
}

const render = () => {
	const {items} = state
	$app.innerHTML = `
		<ul>
			${items.map(item => `<li>${item}</li>`).join('')}
		</ul>
		<button id="append">추가</button>
	`;
	document.querySelector('#append').addEventListener('click', () => {
		setState({items: [...items, `item${items.length+1}`]})
	})
}

const setState = (newState) => {
	state = { ...state, ...newState };
	render();
}

render();