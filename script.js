const files = {};
const fileSelect = document.getElementById('fileSelect');
const contentDiv = document.getElementById('markdownContent');

function setFileSelect() {
  const fileNames = Object.keys(files).map(fileName => Number(fileName.replace('ng', ''))).sort((a,b) => a>b ? -1 : 1);
  fileNames.forEach((name) => {
    const option = document.createElement('option');
    option.value = 'ng' + name;
    option.textContent = 'Angular ' + name;
    fileSelect.appendChild(option);
  });
  fileSelect.style.display = 'unset';
}

function displayMarkdown(fileName) {
  if (!files[fileName]) {
    contentDiv.innerHTML = '';
    return;
  }
  const markdown = files[fileName];
  const html = marked.parse(markdown);
  contentDiv.className = 'markdown-body';
  contentDiv.innerHTML = html;
}

fileSelect.addEventListener('change', (e) => {
  displayMarkdown(e.target.value);
});

Promise.all(
  FILE_NAMES.map((fileName) =>
    fetch(MARKDOWN_FOLDER + fileName + '.md')
      .then((r) => r.text())
      .then((txtFile) => {
        files[fileName] = txtFile;
      })
  )
).then(() => {
  setFileSelect();
});
