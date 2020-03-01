let formElem = document.querySelector('[data-form]');

class sexyForm {
	constructor(options) {
		this.title = options.title ? options.title : 'Форма обратной связи';
		this.labels = options.labels;
		this.method = options.method ? options.method : 'get';
		this.fields = [];

		this.form = false;

		this.modalBtn = document.querySelector('[data-modal]');
		this.showModal = false;
		this.modal = false;
		this.start();
	}

	//start
	start = () => {
		this.modal = document.createElement('div');
		this.modal.classList.add('modal');
		this.modalBtn.addEventListener('click', () => this.togglerModal(this.modal));
	};

	//modal
	togglerModal = modal => {
		if (!this.showModal) {
			document.body.appendChild(modal);
			this.init();
			this.showModal = true;
		} else {
			this.form.remove();
			modal.remove();
			this.showModal = false;
		}
	};

	//init
	init = () => {
		const form = document.createElement('form');
		this.form = form;
		this.form.classList.add('form');
		this.form.setAttribute('method', this.method);

		!this.form.hasAttribute('novalidate') ? this.form.setAttribute('novalidate', true) : null;
		this.form.addEventListener('submit', e => this.submit(e));

		this.header(this.title);
		this.body();
		this.footer();

		this.modal.appendChild(this.form);
	};

	close = () => {
		const close = document.createElement('div');
		close.classList.add('form__close');
		close.addEventListener('click', () => this.togglerModal(this.modal));

		return close;
	};

	//crate header
	header = title => {
		const div = document.createElement('div');
		div.classList.add('form__header');
		div.innerHTML = `<h3 class="form__title">${this.title}</h3>`;
		div.appendChild(this.close());
		this.form.appendChild(div);
	};

	//create body
	body = () => {
		const div = document.createElement('div');

		div.classList.add('form__body');
		this.form.appendChild(div);

		this.labels.forEach(field => {
			const label = document.createElement('label');
			label.classList.add('form__label');
			label.innerHTML = `
				<span class='form__label-title'>${field.title}</span>
				<input class='form__input' name='${field.name}' type='${field.type}' />
			`;
			div.appendChild(label);

			this.fields.push(label);
		});
	};

	//create footer
	footer = () => {
		const div = document.createElement('div');

		div.classList.add('form__footer');
		div.innerHTML = `
			<button class="btn form__btn" type="submit">submit</button>
		`;
		this.form.appendChild(div);
	};

	//error buff/debuff
	addError = field => {
		!field.classList.contains('error') ? field.classList.add('error') : null;
		return false;
	};
	removeError = field => {
		field.classList.contains('error') ? field.classList.remove('error') : null;
		return true;
	};

	//text validation
	validationTextInput = (input, field) => {
		return input.value === '' ? this.addError(field) : this.removeError(field);
	};

	//email validation
	validationEmailInput = (input, field) => {
		const reg = /@/.test(input.value);
		return !reg ? this.addError(field) : this.removeError(field);
	};

	//submit
	submit = e => {
		e.preventDefault();
		let valid = true;

		this.fields.forEach(field => {
			const input = field.querySelector('input');

			if (input.type == 'text') {
				!this.validationTextInput(input, field) ? (valid = false) : null;
			}

			if (input.type == 'email') {
				!this.validationEmailInput(input, field) ? (valid = false) : null;
			}
		});

		if (!valid) {
			return false;
		}

		console.log('Валидация успешна');
	};
}

const myForm = new sexyForm({
	title: 'Заказать товар',
	labels: [
		{
			type: 'text',
			name: 'firstname',
			title: 'First Name'
		},
		{
			type: 'text',
			name: 'lastname',
			title: 'Last Name'
		},
		{
			type: 'email',
			name: 'email',
			title: 'Email'
		}
	]
});
