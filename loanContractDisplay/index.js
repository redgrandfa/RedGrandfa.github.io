let app = new Vue({
	el: "#app",
	data: {
		fields: [
			{ key: "Id", label: "", sortable: true, stickyColumn: true },
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
		items: contractDataList,
		sortBy: "DateStart",
		sortDesc: true,

		perPage: 10,
		currentPage: 1,
		// filter: '',
	},
	computed: {
		totalRows() {
			return this.items.length;
		},
		totalDistributedInterest(){
			const sum = this.items.reduce(
				(sum, x , i) => {
					return sum + x.DistributedInterest
				}
				,0,
			)
			return sum
		}
	},
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
