let editMuridIndex = null;

function simpanMurid() {
  const data = {
    nama: mNama.value,
    ic: mIC.value,
    ibu: mIbu.value,
    icIbu: mICIbu.value,
    bapa: mBapa.value,
    icBapa: mICBapa.value,
    alergik: mAlergik.value,
    kelas: mKelas.value
  };

  if (!data.nama) {
    alert("Nama murid wajib diisi");
    return;
  }

  let list = JSON.parse(localStorage.getItem("murid")) || [];

  if (editMuridIndex !== null) {
    list[editMuridIndex] = data;
    editMuridIndex = null;
  } else {
    list.push(data);
  }

  localStorage.setItem("murid", JSON.stringify(list));

  clearMuridForm();
  paparMurid();
}

function paparMurid() {
  const list = JSON.parse(localStorage.getItem("murid")) || [];
  const tbody = document.getElementById("muridTable");
  const carian = document.getElementById("cariMurid").value.toLowerCase();

  tbody.innerHTML = "";
  let kira = 0;

  list.forEach((m, i) => {
    if (carian && !m.nama.toLowerCase().includes(carian)) return;

    kira++;

    tbody.innerHTML += `
      <tr>
        <td>${kira}</td>
        <td>${m.nama}</td>
        <td>${m.ic || '-'}</td>
        <td>${m.alergik || '-'}</td>
        <td>
          <button onclick="editMurid(${i})">✏️</button>
          <button onclick="hapusMurid(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function editMurid(i) {
  const m = JSON.parse(localStorage.getItem("murid"))[i];

  mNama.value = m.nama;
  mIC.value = m.ic;
  mIbu.value = m.ibu;
  mICIbu.value = m.icIbu;
  mBapa.value = m.bapa;
  mICBapa.value = m.icBapa;
  mAlergik.value = m.alergik;
  mKelas.value = m.kelas || "";

  editMuridIndex = i;
}

function hapusMurid(i) {
  if (!confirm("Padam maklumat murid ini?")) return;

  let list = JSON.parse(localStorage.getItem("murid"));
  list.splice(i, 1);
  localStorage.setItem("murid", JSON.stringify(list));

  paparMurid();
}

function clearMuridForm() {
  mNama.value = "";
  mIC.value = "";
  mIbu.value = "";
  mICIbu.value = "";
  mBapa.value = "";
  mICBapa.value = "";
  mAlergik.value = "";
}

document.addEventListener("DOMContentLoaded", paparMurid);
