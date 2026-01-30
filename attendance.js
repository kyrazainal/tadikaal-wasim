let editIndex = null;

function simpanKehadiran() {
  let data = {
    tarikh: kmTarikh.value,
    nama: kmNama.value,
    hadir: kmHadir.value,
    balik: kmBalik.value,
    catatan: kmCatatan.value
  };

  let list = JSON.parse(localStorage.getItem("kehadiranMurid")) || [];

  if (editIndex !== null) {
    list[editIndex] = data;
    editIndex = null;
  } else {
    list.push(data);
  }

  localStorage.setItem("kehadiranMurid", JSON.stringify(list));
  paparKehadiran();
  kiraHadirHariIni();
}

function paparKehadiran() {
  let list = JSON.parse(localStorage.getItem("kehadiranMurid")) || [];
  let tarikh = filterTarikh.value;
  kmTable.innerHTML = "";

  list.forEach((d,i)=>{
    if (tarikh && d.tarikh !== tarikh) return;

    kmTable.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${d.tarikh}</td>
        <td>${d.nama}</td>
        <td>${d.hadir}</td>
        <td>${d.balik}</td>
        <td>${d.catatan}</td>
        <td>
          <button onclick="edit(${i})">✏️</button>
          <button onclick="hapus(${i})">🗑️</button>
        </td>
      </tr>`;
  });
}

function edit(i) {
  let d = JSON.parse(localStorage.getItem("kehadiranMurid"))[i];
  kmTarikh.value=d.tarikh;
  kmNama.value=d.nama;
  kmHadir.value=d.hadir;
  kmBalik.value=d.balik;
  kmCatatan.value=d.catatan;
  editIndex=i;
}

function hapus(i) {
  let list = JSON.parse(localStorage.getItem("kehadiranMurid"));
  list.splice(i,1);
  localStorage.setItem("kehadiranMurid",JSON.stringify(list));
  paparKehadiran();
  kiraHadirHariIni();
}

function kiraHadirHariIni() {
  let today = new Date().toISOString().split("T")[0];
  let list = JSON.parse(localStorage.getItem("kehadiranMurid")) || [];
  hadirHariIni.textContent = list.filter(d=>d.tarikh===today).length;
}

document.addEventListener("DOMContentLoaded", ()=>{
  paparKehadiran();
  kiraHadirHariIni();
});
