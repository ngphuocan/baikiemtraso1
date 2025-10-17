const SchoolSystem = {
  danhSach: [],
  soLuongHocSinh: 0,
  khoiTao(data = []) {
    for (let item of data) {
      this.danhSach.push(item);
    }
    this.soLuongHocSinh = this.danhSach.length;
  },
  themHocSinh(hocSinh = []) {
    for (let hs of hocSinh) {
      const namHienTai = new Date().getFullYear();
      const stt = String(this.soLuongHocSinh + 1).padStart(3, "0");
      const maMoi = `ma${namHienTai}${stt}`;
      const hocSinhMoi = {
        maHS: maMoi,
        ...hs,
        diemTB: Number(hs.diemTB || 0),
      };
      this.danhSach.push(hocSinhMoi);
      this.soLuongHocSinh++;
      return maHs;
    }
  },
  timHocSinh(maHS) {
    const hocSinh = this.danhSach.find((found) => found.maHS === maHS);
    return hocSinh || null;
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
    const danhSachLop = this.danhSach.filter(
      (hocSinh) => hocSinh.lopHoc === tenLop
    );
    if (danhSachLop.length === 0) {
      console.log(`Lớp ${tenLop} không tồn tại`);
      return null;
    } else {
      console.log(`Danh sách học sinh của lớp${tenLop}:`);
      return danhSachLop;
    }
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