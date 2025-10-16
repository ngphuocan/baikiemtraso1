// Ví dụ một học sinh
const hocSinh = {
  maHS: "",
  hoTen: "",
  lopHoc: "",
  diemTB: 0.0,
  hanhKiem: ""
};
class SchoolSystem {
  // 1. Khởi tạo
  constructor(data = []) {
    this.danhSach = [];
    this.soLuongHocSinh = 0;
    data.forEach(hs => this.themHocSinh(hs));
  }
  _taoMaHocSinh() {
    const nam = new Date().getFullYear();
    const stt = String(this.soLuongHocSinh + 1).padStart(3, "0");
    return `ma${nam}${stt}`;
  }
  themHocSinh(hocSinh) {
    const trung = this.danhSach.some(
      hs => hs.hoTen === hocSinh.hoTen && hs.lopHoc === hocSinh.lopHoc
    );
    if (trung) return null;

    const maHS = this._taoMaHocSinh();
    const hocSinhMoi = { ...hocSinh, maHS };
    this.danhSach.push(hocSinhMoi);
    this.soLuongHocSinh++;
    return maHS;
  }
  timHocSinh(maHS) {
    if (!/^ma\d{4}\d{3}$/.test(maHS)) return null;
    return this.danhSach.find(hs => hs.maHS === maHS) || null;
  }
  capNhatThongTin(maHS, duLieuMoi) {
    const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (index === -1) return false;
    const { maHS: _, ...duLieuCapNhat } = duLieuMoi;
    this.danhSach[index] = { ...this.danhSach[index], ...duLieuCapNhat };
    return true;
  }
  xoaHocSinh(maHS) {
    const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (index === -1) return false;
    this.danhSach.splice(index, 1);
    return true;
  }
  layDanhSachTheoLop(tenLop) {
    return this.danhSach.filter(hs => hs.lopHoc === tenLop);
  }
  thongKeHocLuc() {
    const tk = { "Xuất Sắc": 0, "Giỏi": 0, "Khá": 0, "Trung Bình": 0, "Kém": 0 };
    this.danhSach.forEach(hs => {
      const d = hs.diemTB;
      if (d >= 9.0) tk["Xuất Sắc"]++;
      else if (d >= 8.0) tk["Giỏi"]++;
      else if (d >= 6.5) tk["Khá"]++;
      else if (d >= 5.0) tk["Trung Bình"]++;
      else tk["Kém"]++;
    });
    return tk;
  }
  sapXepTheoDiem(kieuSapXep = "tang") {
    return [...this.danhSach].sort((a, b) =>
      kieuSapXep === "tang" ? a.diemTB - b.diemTB : b.diemTB - a.diemTB
    );
  }
}
const dsMau = [
  { hoTen: "Nguyễn Văn A", lopHoc: "10A1", diemTB: 8.5, hanhKiem: "Tốt" },
  { hoTen: "Trần Thị B", lopHoc: "10A1", diemTB: 9.2, hanhKiem: "Khá" },
  { hoTen: "Lê Văn C", lopHoc: "10A2", diemTB: 6.8, hanhKiem: "Trung bình" },
  { hoTen: "Phạm Thị D", lopHoc: "10A2", diemTB: 4.9, hanhKiem: "Yếu" }
];
const heThong = new SchoolSystem(dsMau);
const maMoi = heThong.themHocSinh({ hoTen: "Võ Minh E", lopHoc: "10A1", diemTB: 7.5, hanhKiem: "Tốt" });
console.log("Mã HS mới:", maMoi);
console.log("Tìm HS:", heThong.timHocSinh(maMoi));
heThong.capNhatThongTin(maMoi, { diemTB: 8.0, hanhKiem: "Khá" });
console.log("Xóa HS:", heThong.xoaHocSinh("ma2025001"));
console.log("Danh sách 10A1:", heThong.layDanhSachTheoLop("10A1"));
console.log("Thống kê:", heThong.thongKeHocLuc());
console.log("Sắp xếp tăng:", heThong.sapXepTheoDiem("tang"));
console.log("Sắp xếp giảm:", heThong.sapXepTheoDiem("giam"));
