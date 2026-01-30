let editGuruIndex = null;

function simpanGuru() {
  const data = {
    nama: gNama.value,
    ic: gIC.value,
    telefon: gTelefon.value,
    jawatan: gJawatan.value,
    kelas: gKelas.value
  };

  if (!data.nama || !data.telefon) {
    alert("Nama dan nombor telefon wajib diisi");
    return;
  }

  let list = JSON.parse(localStorage.getItem("guru")) || [];

  if (editGuruIndex !== null) {
    list[editGuruIndex] = data;
    editGuruIndex = null;
  } else {
    list.push(data);
  }

  localStorage.setItem("guru", JSON.stringify(list));

  clearGuruForm();
  paparGuru();
}

function paparGuru() {
  const list = JSON.parse(localStorage.getItem("guru")) || [];
  const tbody = document.getElementById("guruTable");
  const carian = document.getElementById("cariGuru").value.toLowerCase();

  tbody.innerHTML = "";
  let kira = 0;

  list.forEach((g, i) => {
    if (carian && !g.nama.toLowerCase().includes(carian)) return;

    kira++;

    tbody.innerHTML += `
      <tr>
        <td>${kira}</td>
        <td>${g.nama}</td>
        <td>${g.ic || "-"}</td>
        <td>${g.telefon}</td>
        <td>${g.jawatan || "-"}</td>
        <td>${g.kelas || "-"}</td>
        <td>
          <button onclick="editGuru(${i})">✏️</button>
          <button onclick="hapusGuru(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function editGuru(i) {
  const g = JSON.parse(localStorage.getItem("guru"))[i];

  gNama.value = g.nama;
  gIC.value = g.ic;
  gTelefon.value = g.telefon;
  gJawatan.value = g.jawatan;
  gKelas.value = g.kelas;

  editGuruIndex = i;
}

function hapusGuru(i) {
  if (!confirm("Padam maklumat guru ini?")) return;

  let list = JSON.parse(localStorage.getItem("guru"));
  list.splice(i, 1);
  localStorage.setItem("guru", JSON.stringify(list));

  paparGuru();
}

function clearGuruForm() {
  gNama.value = "";
  gIC.value = "";
  gTelefon.value = "";
  gJawatan.value = "";
  gKelas.value = "";
}

document.addEventListener("DOMContentLoaded", paparGuru);
