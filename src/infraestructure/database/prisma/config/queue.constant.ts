export const queueConstants = {
	tcfs: {
		renner: {
			reqName: `tcfs-renner-req-api-logs.fifo`,
			resName: `tcfs-renner-res-api-logs.fifo`,
		},
		accessLog: {
			reqName: `tcfs-access-logs.fifo`,
		},
	},
	tlt: {
		sbcert: {
			reqName: `tlt-sbcert-req-api-logs.fifo`,
			resName: `tlt-sbcert-res-api-logs.fifo`,
		},
		dermatek: {
			reqName: `tlt-dermatek-req-api-logs.fifo`,
			resName: `tlt-dermatek-res-api-logs.fifo`,
		},
		durli: {
			reqName: `tlt-durli-req-api-logs.fifo`,
			resName: `tlt-durli-res-api-logs.fifo`,
		},
		ruralcert: {
			reqName: `tlt-ruralcert-req-api-logs.fifo`,
			resName: `tlt-ruralcert-res-api-logs.fifo`,
		},
	},
	public: {
		unknown: {
			reqName: `unknown-req-api-logs.fifo`,
			resName: `unknown-res-api-logs.fifo`,
		},
	},
}
