let found = document.querySelector('.info__found');

document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();
	let input = document.querySelector('input');

	if (input.value) {
		fetch(`https://api.github.com/users/${input.value}`)
			.then(response => {
				return response.json();
			})
			.then(obj => {
				if (obj.message == 'Not Found') {
					notFound();
					return;
				} else {
					setInfo(obj);
				}
			});
		input.value = '';
	}
});

let container = document.querySelector('.info__container');
let image = document.querySelector('.info__image');
let login = document.querySelector('.info__login');
let name = document.querySelector('.info__name');
let geo = document.querySelector('.info__location > span');
let url = document.querySelector('.info__url');

function setInfo(obj) {
	container.style.display = 'flex';
	found.style.display = 'none';

	image.src = obj.avatar_url;
	login.textContent = obj.login;

	if (obj.name) {
		name.textContent = obj.name;
	} else {
		name.textContent = '';
	}

	if (obj.location) {
		geo.closest('.info__location').style.display = 'flex';
		geo.textContent = obj.location;
	} else {
		geo.closest('.info__location').style.display = 'none';
	}

	url.href = obj.html_url;
}

function notFound() {
	container.style.display = 'none';
	found.style.display = 'block';
}
