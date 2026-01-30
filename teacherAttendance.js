let editGuruIndex = null;

function simpanKehadiranGuru() {
  const data = {
    tarikh: tgTarikh.value,
    nama: tgNama.value,
    hadir: tgHadir.value,
    balik: tgBalik.value,
    catatan: tgCatatan.value
  };

  if (!data.tarikh || !data.nama) {
    alert("Sila isi tarikh dan nama guru");
    return;
  }

  let list = JSON.parse(localStorage.getItem("kehadiranGuru")) || [];

  if (editGuruIndex !== null) {
    list[editGuruIndex] = data;
    editGuruIndex = null;
  } else {
    list.push(data);
  }

  localStorage.setItem("kehadiranGuru", JSON.stringify(list));

  clearFormGuru();
  paparKehadiranGuru();
}

function paparKehadiranGuru() {
  const list = JSON.parse(localStorage.getItem("kehadiranGuru")) || [];
  const tbody = document.getElementById("tgTable");
  const tarikhFilter = document.getElementById("filterTarikhGuru").value;

  tbody.innerHTML = "";
  let kira = 0;

  list.forEach((d, i) => {
    if (tarikhFilter && d.tarikh !== tarikhFilter) return;

    kira++;

    tbody.innerHTML += `
      <tr>
        <td>${kira}</td>
        <td>${d.tarikh}</td>
        <td>${d.nama}</td>
        <td>${d.hadir || '-'}</td>
        <td>${d.balik || '-'}</td>
        <td>${d.catatan || '-'}</td>
        <td>
          <button onclick="editGuru(${i})">✏️</button>
          <button onclick="hapusGuru(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function editGuru(i) {
  const d = JSON.parse(localStorage.getItem("kehadiranGuru"))[i];

  tgTarikh.value = d.tarikh;
  tgNama.value = d.nama;
  tgHadir.value = d.hadir;
  tgBalik.value = d.balik;
  tgCatatan.value = d.catatan;

  editGuruIndex = i;
}

function hapusGuru(i) {
  if (!confirm("Padam rekod kehadiran guru ini?")) return;

  let list = JSON.parse(localStorage.getItem("kehadiranGuru"));
  list.splice(i, 1);
  localStorage.setItem("kehadiranGuru", JSON.stringify(list));

  paparKehadiranGuru();
}

function clearFormGuru() {
  tgTarikh.value = "";
  tgNama.value = "";
  tgHadir.value = "";
  tgBalik.value = "";
  tgCatatan.value = "";
}

document.addEventListener("DOMContentLoaded", paparKehadiranGuru);
