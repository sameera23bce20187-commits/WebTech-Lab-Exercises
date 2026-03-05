const notesDiv = document.getElementById("notes");
const form = document.getElementById("noteForm");

async function loadNotes() {
  const res = await fetch("/notes");
  const notes = await res.json();

  notesDiv.innerHTML = notes.map(n => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <b>${n.title}</b> (${n.subject}) <br/>
      ${n.description}<br/>
      <small>${n.created_date || ""}</small><br/><br/>

      <button onclick="editNote('${n._id}', '${escapeQuotes(n.title)}', '${escapeQuotes(n.description)}')">Edit</button>
      <button onclick="deleteNote('${n._id}')">Delete</button>
    </div>
  `).join("");
}

function escapeQuotes(s) {
  return String(s).replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const subject = document.getElementById("subject").value;
  const description = document.getElementById("description").value;

  await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, subject, description })
  });

  form.reset();
  loadNotes();
});

async function deleteNote(id) {
  await fetch(`/notes/${id}`, { method: "DELETE" });
  loadNotes();
}

async function editNote(id, oldTitle, oldDesc) {
  const title = prompt("Edit Title:", oldTitle);
  if (title === null) return;

  const description = prompt("Edit Description:", oldDesc);
  if (description === null) return;

  await fetch(`/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  loadNotes();
}

loadNotes();
