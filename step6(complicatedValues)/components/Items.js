import Component from "../core/Component.js";

/**
 * 단순 구조
 * 아래와 같이 구성할 경우 코드를 관리하기 힘들고 컴포넌트라는 이름이 무색하게 컴포넌트 단위로 활용할 수 없는 상태가 된다.
 * 기본적으로 컴포넌트라는 것은 "재활용"이 목적이라고 한다. 그러기 위해선 하나의 컴포넌트가 최대한 작은 단위의 일을 하도록 만들어야 한다.
 */
export default class Items extends Component {
	get filteredItems() {
		const { isFilter, items } = this.$state;
		return items.filter(({ active }) => (isFilter === 1 && active) ||
																				(isFilter === 2 && !active) ||
																				isFilter === 0);
	}

	setup() {
		this.$state = {
			isFilter: 0,
			items : [
				{
					seq: 1,
					contents: 'item1',
					cative: false,
				},
				{
					seq: 2,
					contents: 'item2',
					cative: true,
				}
			]
		}
	}

	template() {
		return `
			<header>
				<input type="text" class="appender" placeholder="아이템 내용 입력" />
			</header>
			<main>
				<ul>
					${this.filteredItems.map(({contents, active, seq}) => `
						<li data-seq="${seq}">
							${contents}
							<button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
								${active ? '활성' : '비활성' }
							</button>
							<button class="deleteBtn">삭제</button>
						</li>
					`).join('')}
				</ul>
			</main>
			<footer>
				<button class="filterBtn" data-is-filter="0">전체 보기></button>
				<button class="filterBtn" data-is-filter="1">활성 보기></button>
				<button class="filterBtn" data-is-filter="2">비활성 보기></button>
			</footer>
		`
	}

	setEvent() {
		this.addEvent('keyup', '.appender', ({key, target}) => {
			if(key !== 'Enter') return;
			const {items} =this.$state;
			const seq = Math.max(0, ...items.map(v => v.seq)) +1
			const contents = target.value;
			const active = false;
			this.setState({
				items : [
					...items,
					{seq, contents, active}
				]
			});
		});

		this.addEvent('click', '.deleteBtn', ({target})=> {
			const items = [ ...this.$state.items ];
			const seq = Number(target.closest('data-seq').dataset.seq);
			items.splice(items.findIndex(v => v.seq === seq), 1);
			this.setState({items});
		})

		this.addEvent('click', '.toggleBtn', ({target}) => {
			const items = [...this.$state.items];
			const seq = Number(target.closest('[data-seq]').dataset.seq);
			const index = items.findIndex(v => v.seq === seq);
			items[index].active = !items[index].active;
			this.setState({items})
		});

		this.addEvent('click', '.filterBtn', ({ target }) => {
			this.setState({isFilter : Number(target.dataset.isFilter)})
		})
	}

	
}