export default class Component {
	$target;
	$state;
	$props; //부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메소드를 넘겨주기 위함

	constructor ($target, $props) {
		this.$target = $target;
		this.$props = $props;
		this.setup();
		this.setEvent(); 
		this.render();
	}

	setup() {};
	//render 이후에 추가적인 기능을 수행하도록 하기 위해 mounted 추가
	mounted() {};
	template() {return '';}

	render() {
		this.$target.innerHTML = this.template();
		this.mounted();
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
