let editPencapaian = null;

const tahapMaksud = {
  TP1: "Murid baru mengenal asas",
  TP2: "Murid mengenal dan menyebut dengan bimbingan",
  TP3: "Murid boleh menyebut dan memahami sebahagian",
  TP4: "Murid boleh membaca / membuat dengan baik",
  TP5: "Murid mahir dan konsisten",
  TP6: "Murid sangat mahir dan boleh membimbing rakan"
};

function toggleIqra() {
  iqraBox.style.display =
    pKategori.value === "Iqra'" ? "block" : "none";
}

function paparMaksudTahap() {
  maksudTahap.innerText =
    tahapMaksud[pTahap.value] || "";
}

function simpanPencapaian() {
  const data = {
    tarikh: pTarikh.value,
    nama: pNama.value,
    kategori: pKategori.value,
    jilid: pKategori.value === "Iqra'" ? pJilid.value : "-",
    tahap: pTahap.value,
    maksud: tahapMaksud[pTahap.value],
    catatan: pCatatan.value
  };

  if (!data.tarikh || !data.nama || !data.kategori || !data.tahap) {
    alert("Sila lengkapkan maklumat penting");
    return;
  }

  let list = JSON.parse(localStorage.getItem("pencapaian")) || [];

  if (editPencapaian !== null) {
    list[editPencapaian] = data;
    editPencapaian = null;
  } else {
    list.push(data);
  }

  localStorage.setItem("pencapaian", JSON.stringify(list));
  paparPencapaian();
  clearPencapaian();
}

function paparPencapaian() {
  let list = JSON.parse(localStorage.getItem("pencapaian")) || [];
  pTable.innerHTML = "";

  list.forEach((p,i)=>{
    pTable.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${p.tarikh}</td>
        <td>${p.nama}</td>
        <td>${p.kategori}</td>
        <td>${p.jilid}</td>
        <td>${p.tahap}</td>
        <td>${p.catatan || "-"}</td>
        <td>
          <button onclick="editP(${i})">✏️</button>
          <button onclick="hapusP(${i})">🗑️</button>
        </td>
      </tr>`;
  });
}

function editP(i){
  const p = JSON.parse(localStorage.getItem("pencapaian"))[i];
  pTarikh.value=p.tarikh;
  pNama.value=p.nama;
  pKategori.value=p.kategori;
  toggleIqra();
  if(p.kategori==="Iqra'") pJilid.value=p.jilid;
  pTahap.value=p.tahap;
  paparMaksudTahap();
  pCatatan.value=p.catatan;
  editPencapaian=i;
}

function hapusP(i){
  if(!confirm("Padam rekod pencapaian ini?"))return;
  let list = JSON.parse(localStorage.getItem("pencapaian"));
  list.splice(i,1);
  localStorage.setItem("pencapaian",JSON.stringify(list));
  paparPencapaian();
}

function clearPencapaian(){
  pTarikh.value="";
  pNama.value="";
  pKategori.value="";
  pTahap.value="";
  pCatatan.value="";
  maksudTahap.innerText="";
  iqraBox.style.display="none";
}

document.addEventListener("DOMContentLoaded",paparPencapaian);
