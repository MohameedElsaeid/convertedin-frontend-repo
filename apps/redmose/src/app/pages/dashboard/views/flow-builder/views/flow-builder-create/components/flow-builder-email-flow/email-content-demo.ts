export const EMAIL_CONTENT_DEMO = {
    subject: 'Your subject here',
    body: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:660px) {
			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffcf59; background-position: center top;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div style="max-width: 192px;"><img src="data:image/png;base64,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" style="display: block; height: auto; border: 0; width: 100%;" width="192" alt="Your Logo" title="Your Logo"></div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffcf59; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1566/BTS_Banner_shadows.jpg'); background-position: center top; background-repeat: no-repeat;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:615px;line-height:615px;font-size:1px;">&#8202;</div>
													<table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-left:15px;padding-right:15px;padding-top:5px;">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:42px;color:#23ad68;"><span style><strong>SAVE UP TO 60% </strong></span></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="text-align:center;width:100%;">
																<h1 style="margin: 0; color: #8a3c90; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 36px;"><span class="tinyMce-placeholder">Don't miss our Back to School essentials</span></h1>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="button_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:51px;width:140px;v-text-anchor:middle;" arcsize="0%" strokeweight="1.5pt" strokecolor="#23AD68" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#23ad68; font-family:Tahoma, Verdana, sans-serif; font-size:16px">
<![endif]--><a href="https://www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#23ad68;background-color:transparent;border-radius:0px;width:auto;border-top:2px solid #23AD68;font-weight:undefined;border-right:2px solid #23AD68;border-bottom:2px solid #23AD68;border-left:2px solid #23AD68;padding-top:5px;padding-bottom:5px;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;"><strong>SHOP NOW</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-7" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffe28f;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff5d9;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:80px;line-height:80px;font-size:1px;">&#8202;</div>
													<table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:26px;color:#ed5f64;"><strong>Category 1</strong></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:51px;width:140px;v-text-anchor:middle;" arcsize="0%" strokeweight="1.5pt" strokecolor="#ED5F64" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ed5f64; font-family:Tahoma, Verdana, sans-serif; font-size:16px">
<![endif]--><a href="https://www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#ed5f64;background-color:transparent;border-radius:0px;width:auto;border-top:2px solid #ED5F64;font-weight:undefined;border-right:2px solid #ED5F64;border-bottom:2px solid #ED5F64;border-left:2px solid #ED5F64;padding-top:5px;padding-bottom:5px;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;"><strong>SHOP NOW</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-5" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
												</td>
												<td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div style="max-width: 426.667px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1566/BTS_Stationery_2.png" style="display: block; height: auto; border: 0; width: 100%;" width="426.667" alt="Alternate text" title="Alternate text"></div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9fffe;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a4f4fc;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #71e5fb;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div style="max-width: 304px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1566/BTS_backpack_crop.png" style="display: block; height: auto; border: 0; width: 100%;" width="304" alt="Backpacks" title="Backpacks"></div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												</td>
												<td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:105px;line-height:105px;font-size:1px;">&#8202;</div>
													<table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:26px;color:#ffffff;"><strong>Category 2</strong></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:51px;width:140px;v-text-anchor:middle;" arcsize="0%" strokeweight="1.5pt" strokecolor="#FFFFFF" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px">
<![endif]--><a href="https://www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:transparent;border-radius:0px;width:auto;border-top:2px solid #FFFFFF;font-weight:undefined;border-right:2px solid #FFFFFF;border-bottom:2px solid #FFFFFF;border-left:2px solid #FFFFFF;padding-top:5px;padding-bottom:5px;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;"><strong>SHOP NOW</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-5" style="height:80px;line-height:80px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffeade;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7aa9a;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ff816c;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:80px;line-height:80px;font-size:1px;">&#8202;</div>
													<table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:26px;color:#ffffff;"><strong>Category 3</strong></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:51px;width:140px;v-text-anchor:middle;" arcsize="0%" strokeweight="1.5pt" strokecolor="#FFFFFF" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px">
<![endif]--><a href="https://www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:transparent;border-radius:0px;width:auto;border-top:2px solid #FFFFFF;font-weight:undefined;border-right:2px solid #FFFFFF;border-bottom:2px solid #FFFFFF;border-left:2px solid #FFFFFF;padding-top:5px;padding-bottom:5px;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;"><strong>SHOP NOW</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-5" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
												</td>
												<td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
													<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:10px;padding-right:10px;width:100%;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div style="max-width: 406.667px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1566/BTS_decor.png" style="display: block; height: auto; border: 0; width: 100%;" width="406.667" alt="Accessories" title="Accessories"></div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-12" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7aa9a;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-13" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff5d9;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-14" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffe28f;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-15" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffcf57;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
													<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div style="max-width: 224px;"><img src="data:image/png;base64,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" style="display: block; height: auto; border: 0; width: 100%;" width="224" alt="Your Logo" title="Your Logo"></div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
													<div class="spacer_block block-4" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
													<table class="text_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="color: #555555; font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; line-height: 1.2;">
																		<p style="margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px;"><span style="color:#000000;">Unsubscribe | Edit preferences</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-6" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`,
}
