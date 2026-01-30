/* ===============================
   RPH MINGGUAN
   Tadika Al-Wasim
   =============================== */

let editRPHIndex = null;

/* ===============================
   LOAD NAMA MURID IKUT KELAS
   =============================== */
function loadMuridRPH() {
  const kelas = document.getElementById("rKelas").value;
  const muridList = JSON.parse(localStorage.getItem("murid")) || [];
  const selectMurid = document.getElementById("rNamaMurid");

  selectMurid.innerHTML =
    '<option value="">-- Pilih Murid --</option>';

  muridList
    .filter(m => m.kelas === kelas)
    .forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.nama;
      opt.textContent = m.nama;
      selectMurid.appendChild(opt);
    });
}

/* ===============================
   SIMPAN RPH
   =============================== */
function simpanRPH() {
  const data = {
    minggu: rMinggu.value,
    kelas: rKelas.value,
    namaMurid: rNamaMurid.value,
    tarikh: rTarikh.value,
    masa: rMasa.value,
    aktiviti: rAktiviti.value,
    bahan: rBahan.value,
    catatan: rCatatan.value
  };

  if (
    !data.minggu ||
    !data.kelas ||
    !data.namaMurid ||
    !data.tarikh ||
    !data.aktiviti
  ) {
    alert("Sila lengkapkan minggu, kelas, nama murid, tarikh dan aktiviti");
    return;
  }

  let list = JSON.parse(localStorage.getItem("rph")) || [];

  if (editRPHIndex !== null) {
    list[editRPHIndex] = data;
    editRPHIndex = null;
  } else {
    list.push(data);
  }

  localStorage.setItem("rph", JSON.stringify(list));

  clearRPH();
  paparRPH();
}

/* ===============================
   PAPAR RPH IKUT MINGGU
   =============================== */
function paparRPH() {
  const list = JSON.parse(localStorage.getItem("rph")) || [];
  const mingguFilter = document.getElementById("filterMinggu").value;
  const tbody = document.getElementById("rphTable");

  tbody.innerHTML = "";
  let kira = 0;

  list.forEach((r, i) => {
    if (mingguFilter && r.minggu !== mingguFilter) return;

    kira++;

    tbody.innerHTML += `
      <tr>
        <td>${kira}</td>
        <td>${r.kelas}</td>
        <td>${r.namaMurid}</td>
        <td>${r.tarikh}</td>
        <td>${r.masa || "-"}</td>
        <td>${r.aktiviti}</td>
        <td>${r.bahan || "-"}</td>
        <td>${r.catatan || "-"}</td>
        <td>
          <button onclick="editRPH(${i})">✏️</button>
          <button onclick="hapusRPH(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

/* ===============================
   EDIT RPH
   =============================== */
function editRPH(i) {
  const r = JSON.parse(localStorage.getItem("rph"))[i];

  rMinggu.value = r.minggu;
  rKelas.value = r.kelas;
  loadMuridRPH();
  rNamaMurid.value = r.namaMurid;
  rTarikh.value = r.tarikh;
  rMasa.value = r.masa;
  rAktiviti.value = r.aktiviti;
  rBahan.value = r.bahan;
  rCatatan.value = r.catatan;

  editRPHIndex = i;
}

/* ===============================
   HAPUS RPH
   =============================== */
function hapusRPH(i) {
  if (!confirm("Padam RPH ini?")) return;

  let list = JSON.parse(localStorage.getItem("rph"));
  list.splice(i, 1);
  localStorage.setItem("rph", JSON.stringify(list));

  paparRPH();
}

/* ===============================
   CLEAR FORM
   =============================== */
function clearRPH() {
  rTarikh.value = "";
  rMasa.value = "";
  rAktiviti.value = "";
  rBahan.value = "";
  rCatatan.value = "";
}

/* ===============================
   AUTO LOAD
   =============================== */
document.addEventListener("DOMContentLoaded", paparRPH);
