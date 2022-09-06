let dropArea = document.querySelector('.drop-area');

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

const dragInEvents = events.splice(0, 2);

const dropEvents = events.splice(-2);

// Prevent event defaults

['dragenter', 'dragover', 'dragleave', 'drop'].forEach((event) => {
	dropArea.addEventListener(event, preventDefaults, false);
});

function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

// --- Drag and drop events styling ---

// Drag in events
dragInEvents.forEach((event) => {
	dropArea.addEventListener(event, highlight, false);
});

// Drop events
dropEvents.forEach((event) => {
	dropArea.addEventListener(event, unhighlight, false);
});

function highlight() {
	dropArea.classList.add('highlight');
}

function unhighlight() {
	dropArea.classList.remove('highlight');
}

// --- Handle drop event ---
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
	let dt = e.dataTransfer;
	let files = dt.files;

	handleFilesSelect(files);
}

// --- Handle form submit event ---
function handleFilesSelect(files) {
	[...files].forEach(previewFile);
}

function uploadFile(file) {
	// Convert to png or jpg depending on a setting of form
}

// --- Generate uploaded file preview ---
function previewFile(file) {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function () {
		let img = document.createElement('img');
		img.src = reader.result;
		document.getElementById('gallery').appendChild(img);
	};
}
