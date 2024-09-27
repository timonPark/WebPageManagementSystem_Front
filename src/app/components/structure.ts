const sidebarStructure = [
  {
    menuNo: 1,
    title: "Dasbor",
    name: "dasbor",
    parent: true,
    icon: "dasbor",
    link: "/dashboard"
  },
  {
    menuNo: 2,
    title: "Transaksi",
    name: "transaksi",
    parent: true,
    icon: "transaksi",
    child: [
      {
        menuNo: 6,
        title: "RFQ",
        name: "transaksi.rfq",
        link: "/dashboard/rfq",
        icon: "dot"
      },
      {
        menuNo: 7,
        title: "Quotation",
        name: "transaksi.quotation",
        link: "/dashboard/quotation",
        icon: "dot"
      },
      {
        menuNo: 8,
        title: "Purchase Request",
        name: "transaksi.pr",
        link: "/dashboard/purchase-request",
        icon: "dot"
      },
      {
        menuNo: 9,
        title: "Purchase Order",
        name: "transaksi.po",
        link: "/dashboard/purchase-order",
        icon: "dot"
      },
      {
        menuNo: 10,
        title: "Tagihan",
        name: "transaksi.tagihan",
        link: "/dashboard/invoice",
        icon: "dot"
      },
      {
        menuNo: 11,
        title: "Pembayaran",
        name: "transaksi.pembayaran",
        link: "/dashboard/payment",
        icon: "dot"
      }
    ]
  },
  {
    menuNo: 3,
    title: "Perusahaan",
    name: "perusahaan",
    parent: true,
    icon: "perusahaan",
    child: [
      {
        menuNo: 12,
        title: "Profil Perusahaan",
        name: "perusahaan.profil",
        link: "/dashboard/company-profile",
        icon: "dot"
      },
      {
        menuNo: 13,
        title: "Akun Bank",
        name: "perusahaan.bank",
        link: "/dashboard/bank-account",
        icon: "dot"
      },
      {
        menuNo: 14,
        title: "Alamat",
        name: "perusahaan.alamat",
        link: "/dashboard/company-address/shipping",
        icon: "dot",
        child: [
          {
            menuNo: 19,
            title: "Alamat Pengiriman",
            name: "perusahaan.alamat.pengiriman",
            link: "/dashboard/company-address/shipping",
            icon: "dot"
          },
          {
            menuNo: 20,
            title: "Alamat Tagihan",
            name: "perusahaan.alamat.tagihan",
            link: "/dashboard/company-address/billing",
            icon: "dot"
          }
        ]
      },
      {
        menuNo: 15,
        title: "Daftar Akun Pengguna",
        name: "perusahaan.akun",
        link: "/dashboard/user-account",
        icon: "dot"
      },
      {
        menuNo: 16,
        title: "Departemen",
        name: "perusahaan.department",
        link: "/dashboard/department",
        icon: "dot"
      },
      {
        menuNo: 17,
        title: "Manajemen Persetujuan",
        name: "perusahaan.persetujuan",
        icon: "dot",
        child: [
          {
            menuNo: 21,
            title: "Penyetuju Kategori",
            name: "perusahaan.persetujuan.kategori",
            link: "/dashboard/approval/category",
            icon: "dot"
          },
          {
            menuNo: 22,
            title: "Penyetuju Departemen",
            name: "perusahaan.persetujuan.departemen",
            link: "/dashboard/approval/department",
            icon: "dot"
          },
          {
            menuNo: 23,
            title: "E-procurement",
            name: "perusahaan.persetujuan.proc",
            link: "/dashboard/approval/eproc",
            icon: "dot"
          },
          {
            menuNo: 24,
            title: "Pengaturan",
            name: "perusahaan.persetujuan.config",
            link: "/dashboard/approval/configure",
            icon: "dot"
          }
        ]
      },
      {
        menuNo: 18,
        title: "Pengaturan Pembelian",
        name: "perusahaan.pengaturan.pembelian",
        icon: "dot",
        child: [
          {
            menuNo: 25,
            title: "Anggaran",
            name: "perusahaan.pengaturan.pembelian.anggaran",
            link: "/dashboard/purchase-setting/budget",
            icon: "dot"
          }
        ]
      }
    ]
  },
  {
    menuNo: 4,
    title: "MOU",
    name: "mou",
    parent: true,
    icon: "mou",
    link: "/dashboard/mou"
  },
  {
    menuNo: 5,
    title: "Pusat Unduh Data",
    name: "pusatunduhdata",
    parent: true,
    icon: "pusatunduhdata",
    child: [
      {
        menuNo: 26,
        title: "Unduh Data Transaksi",
        name: "pusatunduhdata.unduhdatatransaksi",
        link: "/dashboard/download/transaction",
        icon: "dot"
      },
      {
        menuNo: 27,
        title: "Unduh Data Perusahaan",
        name: "pusatunduhdata.unduhdataperusahaan",
        link: "/dashboard/download/company",
        icon: "dot"
      },
      {
        menuNo: 28,
        title: "Unduh Data MOU",
        name: "pusatunduhdata.unduhdatamou",
        link: "/dashboard/download/mou",
        icon: "dot"
      }
    ]
  }
];

export { sidebarStructure };
