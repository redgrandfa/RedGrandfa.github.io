let app = new Vue({
	el: "#app",
	data: {
		fields: [
			{ key: "Id", label: "序", sortable: true },
			{ key: "Photos", label: "契約照", sortable: false },
			{
				key: "Principal",
				label: "本金",
				sortable: true,
				formatter: (v, key, item) => {
					return `${v / 10000}萬`;
				},
			},
			{
				key: "Type",
				label: "類型",
				sortable: true,
				formatter: (v, key, item) => {
					if (v == 1) return "月息";
					if (v == 2) return "本息攤還";
					if (v == 3) return "一次領";
				},
			},
			{
				key: "Rate",
				label: "利率",
				// sortable: true, // yRate mRate , dRate 以便比較
				formatter: (v, key, item) => {
					//.toPrecision(3)
					if (item.Type == 1) return `月利率:${v.toFixed(2)}%`;
					if (item.Type == 2) return `年利率:${v}%`;
					if (item.Type == 3) return `日利率:十萬分之${v}`;
				},
			},
			{
				key: "DateStart",
				label: "起始日",
				sortable: true,
				variant: "warning",
				formatter: (v, key, item) => v.toLocaleDateString(),
			},
			// TODO 歷時幾個月...?
			{
				key: "DistributedInterest",
				label: "已發利息",
				sortable: true,
				variant: "success",
			},
			{
				key: "DateFinish",
				label: "清償日",
				sortable: true,
				formatter: (v, key, item) => {
					if (v instanceof Date) {
						return v;
					}
					if (item.Type == 2) {
						return `X(已攤還${item.principalAmortized})`;
					}
					return "X";
				},
			},
			{
				key: "Name",
				label: "姓名",
				sortable: true,
				formatter: (v, key, item) => {
					if (v == null) {
						return "匿名中";
					}
					return v;
				},
			},
			{
				key: "DateEnd",
				label: "到期日",
				sortable: true,
				variant: "danger",
				formatter: (v, key, item) => v.toLocaleDateString(),
			},
			{ key: "Duration", label: "年限", sortable: true },
		],
		items: [
			//清償時把【利息+清償日】寫死。
			// {
			// 	Id: 93,
			// 	Name: null,
			// 	Photos: "",
			// 	DateStart: new Date(2023, 0, 13),
			// 	DateEnd: new Date(2024, 1, 14),
			// 	Principal: 200000,
			// 	Type: 3,
			//  Rate: 21 ,
			// 	// DistributedInterest: //null / 清償時寫定
			// },
			//---------------------------------
			{
				Id: 1,
				Name: null,
				Photos: ["1"],
				DateStart: new Date(2023, 1, 19), // 112 / 2 /19
				DateEnd: new Date(2028, 1, 19), //
				Duration: 5,
				Principal: 1020000,
				Type: 1,
				Rate: 10 / 12,
			},
			{
				Id: 2,
				Name: null,
				Photos: ["2"],
				DateStart: new Date(2023, 3, 6), //112 年  04 月 06  日
				DateEnd: new Date(2024, 3, 7), //113年 04 月 07 日
				Duration: 1,
				Principal: 499800,
				Type: 1,
				Rate: 8 / 12,
			},
			{
				Id: 3,
				Name: null,
				Photos: ["3_1", "3_2"],
				DateStart: new Date(2023, 5, 28), //112 年  06 月 28 日
				DateEnd: new Date(2028, 5, 28), //117年 06 月 28 日
				Duration: 5,
				Principal: 500000,
				Type: 2,
				Rate: 8,
				AmortizeTable: [
					[6806, 3333],
					[6851, 3288],
					[6897, 3242],
					[6943, 3196],
					[6989, 3150],
					[7036, 3103],
					[7082, 3057],
					[7130, 3009],
					[7177, 2962],
					[7225, 2914],
					[7273, 2866],
					[7322, 2817],
					[7371, 2768],
					[7420, 2719],
					[7469, 2670],
					[7519, 2620],
					[7569, 2570],
					[7620, 2519],
					[7670, 2469],
					[7721, 2418],
					[7773, 2366],
					[7825, 2314],
					[7877, 2262],
					[7929, 2210],
					[7982, 2157],
					[8036, 2103],
					[8089, 2050],
					[8143, 1996],
					[8197, 1942],
					[8252, 1887],
					[8307, 1832],
					[8362, 1777],
					[8418, 1721],
					[8474, 1665],
					[8531, 1608],
					[8588, 1551],
					[8645, 1494],
					[8702, 1437],
					[8760, 1379],
					[8819, 1320],
					[8878, 1261],
					[8937, 1202],
					[8996, 1143],
					[9056, 1083],
					[9117, 1022],
					[9178, 961],
					[9239, 900],
					[9300, 839],
					[9362, 777],
					[9425, 714],
					[9488, 651],
					[9551, 588],
					[9615, 524],
					[9679, 460],
					[9743, 396],
					[9808, 331],
					[9873, 266],
					[9939, 200],
					[10006, 133],
					[10011, 67],
				],
			},
			{
				Id: 4,
				Name: null,
				Photos: [],
				DateStart: new Date(2023, 8, 18), //112 年  08 月 18 日
				DateEnd: new Date(2030, 8, 18), //119年 08月 18 日
				Duration: 7,
				Principal: 200000,
				Type: 2,
				Rate: 8,
				AmortizeTable: [
					[1785, 1333],
					[1797, 1321],
					[1809, 1309],
					[1821, 1297],
					[1833, 1285],
					[1845, 1273],
					[1857, 1261],
					[1870, 1248],
					[1882, 1236],
					[1895, 1223],
					[1907, 1211],
					[1920, 1198],
					[1933, 1185],
					[1946, 1172],
					[1959, 1159],
					[1972, 1146],
					[1985, 1133],
					[1998, 1120],
					[2011, 1107],
					[2025, 1093],
					[2038, 1080],
					[2052, 1066],
					[2066, 1052],
					[2079, 1039],
					[2093, 1025],
					[2107, 1011],
					[2121, 997],
					[2135, 983],
					[2150, 968],
					[2164, 954],
					[2178, 940],
					[2193, 925],
					[2208, 910],
					[2222, 896],
					[2237, 881],
					[2252, 866],
					[2267, 851],
					[2282, 836],
					[2297, 821],
					[2313, 805],
					[2328, 790],
					[2344, 774],
					[2359, 759],
					[2375, 743],
					[2391, 727],
					[2407, 711],
					[2423, 695],
					[2439, 679],
					[2455, 663],
					[2471, 647],
					[2488, 630],
					[2505, 613],
					[2521, 597],
					[2538, 580],
					[2555, 563],
					[2572, 546],
					[2589, 529],
					[2606, 512],
					[2624, 494],
					[2641, 477],
					[2659, 459],
					[2677, 441],
					[2694, 424],
					[2712, 406],
					[2731, 387],
					[2749, 369],
					[2767, 351],
					[2785, 333],
					[2804, 314],
					[2823, 295],
					[2842, 276],
					[2861, 257],
					[2880, 238],
					[2899, 219],
					[2918, 200],
					[2938, 180],
					[2957, 161],
					[2977, 141],
					[2997, 121],
					[3017, 101],
					[3037, 81],
					[3057, 61],
					[3077, 41],
					[3007, 20],
				],
			},
		],
		sortBy: "DateStart",
		sortDesc: true,

		// perPage: 2,
		// currentPage: 1,
		// filter: '',
	},
	computed: {},
	methods: {
		photoImgPath(photo) {
			return `./images/contracts/${photo}.jpg`;
		},
		fillInDuration(item) {
			const diff = item.DateEnd - item.DateStart;
			item.Duration = new Date(diff).getFullYear() - 1970;
		},
		fillInDistributedInterest(item) {
			if (item.DistributedInterest !== undefined) return;

			item.DistributedInterest = this.calcDistributedInterest(item);
		},
		calcDistributedInterest(item) {
			//算經過月數
			const from = item.DateStart;
			const now = new Date();

			const yDiff = now.getFullYear() - from.getFullYear();
			const mDiff = now.getMonth() - from.getMonth();
			const dDiff = now.getDate() - from.getDate();

			let months = yDiff * 12 + mDiff;
			if (dDiff < 0) months--;

			// ----分類型處理-----------------------
			if (item.Type == 1) {
				return (item.Principal * months * item.Rate) / 100;
			} else if (item.Type == 2) {
				const t = item.AmortizeTable;
				if (t == undefined) throw new Error("缺本息攤還表");

				let principalSum = 0;
				let interestSum = 0;
				for (let i = 0; i < months; i++) {
					principalSum += t[i][0];
					interestSum += t[i][1];
				}

				item.principalAmortized = principalSum;
				return interestSum;
			} else if (item.Type == 3) return 0;
			else {
				throw new Error("Type 非 1,2,3");
			}
		},
	},
	created() {
		const items = this.items;
		items.forEach((item) => {
			this.fillInDuration(item);
			this.fillInDistributedInterest(item);
		});
	},
});
