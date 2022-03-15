import { lazy } from 'react';

const Home = lazy(() => import('containers/Home/home'));
//Demo
const Demo1 = lazy(() => import('containers/Sample/Demo1/demo1'));

// Banner
const BannerDisplay = lazy(() => import('containers/Banner/DisplayBanner'));
const BannerUpload = lazy(() => import('containers/Banner/UploadBanner'));

// Danh muc he thong
const DanhMucThamSoHeThong = lazy(() => import('containers/DanhMucHeThong/DanhMucThamSoHeThong'));
const DanhMucDoiTac = lazy(() => import('containers/DanhMucHeThong/DanhMucDoiTac'));
const DanhMucCauHoiThuongGap = lazy(() => import('containers/DanhMucHeThong/DanhMucCauHoiThuongGap'));
const AgentList  = lazy(() => import('containers/DanhMucHeThong/AgentList'));
// Dich vu vien thong
const ThongTinGoiCuoc = lazy(() => import('containers/DichVuVienThong/ThongTinGoiCuoc'));
const ThongTinThueBao = lazy(() => import('containers/DichVuVienThong/ThongTinThueBao'));
const BlackList = lazy(() => import('containers/DichVuVienThong/BlackList'));
const QuanLyTinTuc = lazy(() => import('containers/ItelClub/QuanLyTinTucItelClub'));
const TopUp = lazy(() => import('containers/DichVuVienThong/TopUp'));
const SearchMessageLog = lazy(() => import('containers/Utilities/SearchMessageLog'));

// Report Film
const DetailsOfFilmViewingHistory = lazy(() => import('containers/Report/Film/ChiTietLichSuXemFilmCuaUser'));
const UserByFilm = lazy(() => import('containers/Report/Film/ThongKeSoLuongUserTheoTungPhim'));
const MinuteByFilm = lazy(() => import('containers/Report/Film/ThongKeSoPhutTheoTungPhim'));
const MinuteDetailByFilm = lazy(() => import('containers/Report/Film/ThongKeChiTietUserXemPhimTheoSoPhut'));
const FilmByCategory = lazy(() => import('containers/Report/Film/ThongKeFilmUserXemTheoTheLoai'));
const ThongKeSoLuotXemPhimTheoTungPhim = lazy(() => import('containers/Report/Film/ThongKeLuotXemPhimTheoTungPhim'));

// Report Game
const ThongKeSoLuongNguoiChoiLuotChoi = lazy(() => import('containers/Report/Game/ThongKeSoLuongNguoiChoiLuotChoi'));
const ThongKeChiTietNguoiDungChoiGame = lazy(() => import('containers/Report/Game/ThongKeChiTietNguoiDungChoiGame'));
const ThongKeDiemNguoiChoiGameLe = lazy(() => import('containers/Report/Game/ThongKeDiemNguoiChoiGameLe'));
const ThongKeDiemNguoiChoiGameLeChiTiet = lazy(() => import('containers/Report/Game/ThongKeDiemNguoiChoiGameLeChiTiet'));


const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/demo', exact: true, name: 'Demo1', component: Demo1 },

    { path: '/Banner/Display', exact: true, name: 'BannerDisplay', component: BannerDisplay },
    { path: '/Banner/Upload', exact: true, name: 'BannerUpload', component: BannerUpload },

    { path: '/DanhMucHeThong/DanhMucThamSoHeThong', exact: true, name: 'DanhMucThamSoHeThong', component: DanhMucThamSoHeThong },
    { path: '/DanhMucHeThong/DanhMucDoiTac', exact: true, name: 'DanhMucDoiTac', component: DanhMucDoiTac },
    { path: '/DanhMucHeThong/DanhMucCauHoiThuongGap', exact: true, name: 'DanhMucCauHoiThuongGap', component: DanhMucCauHoiThuongGap },
    { path: '/DanhMucHeThong/DanhSachDaiLy', exact: true, name: 'AgentList', component: AgentList },

    { path: '/DichVuVienThong/ThongTinGoiCuoc', exact: true, name: 'ThongTinGoiCuoc', component: ThongTinGoiCuoc },
    { path: '/DichVuVienThong/ThongTinThueBao', exact: true, name: 'ThongTinThueBao', component: ThongTinThueBao },
    { path: '/DichVuVienThong/BlackList', exact: true, name: 'BlackList', component: BlackList },
    { path: '/DichVuVienThong/QuanLyGiaoDichTopUp', exact: true, name: 'QuanLyGiaoDichTopUp', component: TopUp },

    { path: '/iTelClub/QuanLyTinITelClub', exact: true, name: 'QuanLyTinTuc', component: QuanLyTinTuc },
    { path: '/Utilities/SearchMessageLog', exact: true, name: 'SearchMessageLog', component: SearchMessageLog },

    // Report Film
    { path: '/BaoCao/Film/ChiTietLichSuXemPhimCuaThueBao', exact: true, name: 'LichSuXemPhimThueBao', component: DetailsOfFilmViewingHistory },
    { path: '/BaoCao/Film/ThongKeSoLuongUserTheoTungPhim', exact: true, name: 'ThongKeSoLuongUserTheoTungPhim', component: UserByFilm },
    { path: '/BaoCao/Film/ThongKeSoPhutTungPhim', exact: true, name: 'ThongKeSoPhutTungPhim', component: MinuteByFilm },
    { path: '/BaoCao/Film/ThongKeSoPhutChiTietTungPhim', exact: true, name: 'ThongKeSoPhutChiTietTungPhim', component: MinuteDetailByFilm },
    { path: '/BaoCao/Film/ThongKeThueBaoXemPhimTheoTheLoai', exact: true, name: 'ThongKeThueBaoXemPhimTheoTheLoai', component: FilmByCategory },
    { path: '/BaoCao/Film/ThongKeSoLuotXemPhimTheoTungPhim', exact: true, name: 'ThongKeSoLuotXemPhimTheoTungPhim', component: ThongKeSoLuotXemPhimTheoTungPhim },

    // Report Game
    { path: '/BaoCao/Game/ThongKeSoLuongNguoiChoiLuotChoi', exact: true, name: 'ThongKeSoLuongNguoiChoiLuotChoi', component: ThongKeSoLuongNguoiChoiLuotChoi },
    { path: '/BaoCao/Game/ChiTietNguoiDungChoiGame', exact: true, name: 'ThongKeChiTietNguoiDungChoiGame', component: ThongKeChiTietNguoiDungChoiGame },
    { path: '/BaoCao/Game/ThongKeDiemNguoiChoiGameLe', exact: true, name: 'ThongKeDiemNguoiChoiGameLe', component: ThongKeDiemNguoiChoiGameLe },
    { path: '/BaoCao/Game/ThongKeDiemNguoiChoiGameLeChiTiet', exact: true, name: 'ThongKeDiemNguoiChoiGameLeChiTiet', component: ThongKeDiemNguoiChoiGameLeChiTiet },
];

export default routes;
