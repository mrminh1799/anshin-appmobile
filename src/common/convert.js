export const StatusOrder ={
    STATUS_CHO_XAC_NHAN: 1,
    STATUS_DA_XAC_NHAN: 2,
    STATUS_DANG_GIAO_HANG: 3,
    STATUS_DA_GIAO_HANG: 4,
    STATUS_DA_HUY: 5,
    STATUS_YEU_CAU_TRA_HANG: 6
}

export const StatusPromotion={
    STATUS_DANG_CHUAN_BI: 0,
    STATUS_DANG_HOAT_DONG: 1,
    STATUS_NGUNG_HOAT_DONG: 2,
    STATUS_KET_THUC: 3,
}

export const TypeOrder={
    STATUS_TYPE_ORDER_CART: 1,
	STATUS_TYPE_ORDER_ONLINE: 2,
	STATUS_TYPE_ORDER_OFFLINE: 3,
}

export const TrangThaiPromotion =(status)=>{
    if(status===StatusPromotion.STATUS_DANG_CHUAN_BI) return'Đang chuẩn bị'
    if(status===StatusPromotion.STATUS_DANG_HOAT_DONG) return 'Đang hoạt động'
    if(status===StatusPromotion.STATUS_NGUNG_HOAT_DONG) return "Tạm dừng"
    if(status===StatusPromotion.STATUS_KET_THUC) return 'Kết thúc'

}
export const TrangThaiGiaoHang =(status)=>{
    if(status===StatusOrder.STATUS_CHO_XAC_NHAN) return "Chờ xác nhận"
    if(status===StatusOrder.STATUS_DA_XAC_NHAN) return "Đã xác nhận"
    if(status===StatusOrder.STATUS_DANG_GIAO_HANG) return "Đang giao hàng"
    if(status===StatusOrder.STATUS_DA_GIAO_HANG) return "Đã giao hàng"
    if(status===StatusOrder.STATUS_DA_HUY) return "Đã hủy"
    if(status===StatusOrder.STATUS_YEU_CAU_TRA_HANG) return <p>Đã giao hàng <span style={{color: 'red'}}>**</span> </p>

}
export const numberWithCommas=(x)=> {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}
export const convertDate = (date) => {
    var d = new Date(date); 
    return d.toLocaleString()
}

export const convertGetPhone = (objStr) => {
    if( objStr==null ) return ""
    const obj = JSON.parse(objStr);
    return  obj.phone
   
}

export const convertGetFullname = (fullname) => {
   if( fullname==null ) return ""
    const obj = JSON.parse(fullname);
    return  obj.fullname;
   
}

export const convertGetAddress = (address) => {
    if( address==null ) return ""
    const obj = JSON.parse(address);
    return  obj.address;
   
}