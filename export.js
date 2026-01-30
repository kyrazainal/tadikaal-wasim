function exportExcel(key, filename) {
  let data = JSON.parse(localStorage.getItem(key)) || [];
  if (!data.length) return;

  let csv = Object.keys(data[0]).join(",") + "\n";
  data.forEach(d=>csv+=Object.values(d).join(",")+"\n");

  let blob = new Blob([csv],{type:"text/csv"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
