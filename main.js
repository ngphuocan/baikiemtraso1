const schoolSystem = {
  danhSach: [],
  soLuongHocSinh: 0,
  khoiTao(data = []) {
    this.danhSach = [...data];
    this.soLuongHocSinh = data.length;
},
  _taoMaHocSinh() {
    const nam = new Date().getFullYear();
    const stt = String(this.soLuongHocSinh + 1).padStart(3, "0");
    return `HS${nam}${stt}`;
  },
  _kiemTraHopLe(hs) {
    const hanhKiemHopLe = ["Tốt", "Khá", "Trung bình", "Yếu"];
    return (
      typeof hs.hoTen === "string" &&
      typeof hs.lopHoc === "string" &&
      typeof hs.diemTB === "number" &&
      hs.diemTB >= 0 &&
      hs.diemTB <= 10 &&
      hanhKiemHopLe.includes(hs.hanhKiem)
    );
  },
  themHocSinh(hocSinh) {
    if (!this._kiemTraHopLe(hocSinh)) return null;
    const maHS = this._taoMaHocSinh();
    const hocSinhMoi = { ...hocSinh, maHS };
    this.danhSach.push(hocSinhMoi);
    this.soLuongHocSinh++;
    return maHS;
  },
  timHocSinh(maHS) {
    return this.danhSach.find((hs) => hs.maHS === maHS) || null;
  },

  capNhatThongTin(maHS, duLieuMoi) {
    const index = this.danhSach.findIndex((hs) => hs.maHS === maHS);
    if (index === -1) return false;
    const { maHS: _, ...duLieuCapNhat } = duLieuMoi;
    const duLieuTam = { ...this.danhSach[index], ...duLieuCapNhat };
    if (!this._kiemTraHopLe(duLieuTam)) return false;

    this.danhSach[index] = duLieuTam;
    return true;
  },
  xoaHocSinh(maHS) {
    const index = this.danhSach.findIndex((hs) => hs.maHS === maHS);
    if (index === -1) return false;
    this.danhSach.splice(index, 1);
    this.soLuongHocSinh--;
    return true;
  },
  layDanhSachTheoLop(tenLop) {
    return this.danhSach.filter((hs) => hs.lopHoc === tenLop);
  },
  timTheoTen(ten) {
    return this.danhSach.filter((hs) =>
      hs.hoTen.toLowerCase().includes(ten.toLowerCase())
    );
  },
  thongKeHocLuc() {
    const thongKe = {
      "Xuất Sắc": 0,
      Giỏi: 0,
      Khá: 0,
      "Trung Bình": 0,
      Kém: 0,
    };

    this.danhSach.forEach((hs) => {
      const dtb = hs.diemTB;
      if (dtb >= 9.0) thongKe["Xuất Sắc"]++;
      else if (dtb >= 8.0) thongKe["Giỏi"]++;
      else if (dtb >= 6.5) thongKe["Khá"]++;
      else if (dtb >= 5.0) thongKe["Trung Bình"]++;
      else thongKe["Kém"]++;
    });

    return thongKe;
  },
  sapXepTheoDiem(kieuSapXep = "tang") {
    const danhSachCopy = [...this.danhSach];
    return danhSachCopy.sort((a, b) =>
      kieuSapXep === "tang" ? a.diemTB - b.diemTB : b.diemTB - a.diemTB
    );
  },
  xuatDanhSach() {
    return [...this.danhSach];
  },
};
