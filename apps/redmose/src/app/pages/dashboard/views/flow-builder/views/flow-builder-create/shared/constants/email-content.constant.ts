export const EMAIL_CONTENT = {
  beforeBody: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]>
\t\t\t\t<xml>
\t\t\t\t\t<o:OfficeDocumentSettings>
\t\t\t\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>
\t\t\t\t\t\t<o:AllowPNG/>
\t\t\t\t\t</o:OfficeDocumentSettings>
\t\t\t\t</xml>
\t\t\t\t<![endif]-->
    <!--[if !mso]>
\t\t\t\t<!-->
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <!--
\t\t\t\t\t<![endif]-->
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
        /*display: none;*/
      }

      @media (max-width: 660px) {
        .row-content {
          width: 100% !important;
        }

        .mobile_hide {
          display: none;
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

        .reverse {
          display: table;
          width: 100%;
        }

        .reverse .column.last {
          display: table-header-group !important;
        }

        .row-2 td.column.last .border {
          padding: 0 0 40px;
          border-top: 0;
          border-right: 0px;
          border-bottom: 0;
          border-left: 0;
        }
      }

      .cn-editor-wrapper {
        background: #fff;
        width: 250px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
        padding: 10px;
        border-radius: 5px;
        position: absolute;
        z-index: 99;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-uploader-tab {
        background: none;
        padding: 5px 10px;
        /*border: none;*/
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        margin: 0;
        border: none;
        cursor: pointer;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-upload-actions {
        display: flex;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-uploader-tab.active {
        border: 1px solid #ccc;
        border-bottom: 1px solid #fff;
        position: relative;
        bottom: -1px;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-upload-tabs-content {
        padding: 10px 0;
        border-top: 1px solid #ccc;
        flex-direction: column;
        display: none;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-upload-tabs-content.active {
        display: block
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-upload-tabs-content label {
        text-transform: capitalize;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        text-align: left;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-upload-tabs-content label span {
        text-align: left;
        font-size: 12px;
      }

      .cn-editor-wrapper .cn-image-upload-tabs .cn-image-upload-tabs-content label input {
        width: 100%;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 13px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        height: 30px;
        padding: 0 10px;
      }

      .cn-editor-wrapper .cn-close-action {
        position: absolute;
        top: 5px;
        right: 10px;
        padding: 0;
        border: none;
        cursor: pointer;
        background: none;
        height: 30px;
      }

      .cn-editor-wrapper .cn-close-action img {
        width: 33px;
        /* border: none; */
        padding: 0;
        margin: 0;
      }

      .cn-editor-wrapper * {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }

      .cn-editor-wrapper .cn-anchor-link-wrapper {
        margin-top: 20px;
      }

      .cn-editor-wrapper .cn-anchor-link-wrapper label {
        display: flex;
        width: 100%;
        flex-direction: column;
        margin-top: 10px;
      }

      .cn-editor-wrapper .cn-anchor-link-wrapper input {
        width: 100%;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 13px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        height: 30px;
        padding: 0 10px;
      }

      .cn-editor-wrapper .cn-anchor-link-wrapper label span {
        text-transform: capitalize;
        font-size: 12px;
        line-height: 12px !important;
        color: #000
      }
    </style>
  </head>`,
  body: '',
  afterBody: '</html>'
}
