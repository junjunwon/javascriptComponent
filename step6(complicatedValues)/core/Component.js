/**
 * 이전단계에서 rendering될때마다 setEvent를 실행했던 것과 달리
 * 이번 단계에서는 event를 각각의 하위 요소가 아니라 component의 target 자체에 등록하는 것
 * 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없어진다.
 */
export default class Component {
	$target;
	$state;

	constructor ($target) {
		this.$target = $target;
		this.setup();
		this.setEvent(); 
		this.render();
	}

	setup() {};
	template() {return '';}

	render() {
		this.$target.innerHTML = this.template();
	}
	setEvent() {}
	setState(newState) {
		this.$state = {...this.$state, ...newState};
		this.render()
	}
	addEvent(eventType, selector, callback) {
		const children = [...this.$target.querySelectorAll(selector)];
		//selector에 명시한 것보다 더 하위 요소가 선택되는 경우가 있을때는
		//closest를 이용하여 처리한다.
		const isTarget = (target) => children.includes(target)
																	|| target.closest(selector);

		this.$target.addEventListener(eventType, event => {
			if(!isTarget(event.target))return false;
			callback(event);
		})
	}
} 
