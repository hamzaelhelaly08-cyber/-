import { getAccessToken, googleSignIn } from './firebase';

declare const gapi: any;
declare const google: any;

export interface PickedFile {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
  sizeBytes?: number;
}

export const openGooglePicker = async (
  onFilePicked: (file: PickedFile) => void,
  onError?: (err: any) => void
) => {
  try {
    let token = await getAccessToken();
    if (!token) {
      const authResult = await googleSignIn();
      token = authResult?.accessToken || null;
    }

    if (!token) {
      throw new Error('Authentication required to access Google Drive & Picker.');
    }

    // Load Google Picker API script if needed
    if (typeof gapi === 'undefined') {
      throw new Error('Google API Client (gapi) is not loaded.');
    }

    gapi.load('picker', () => {
      try {
        const pickerOrigin =
          window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
            ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
            : window.location.origin;

        const docsView = new google.picker.DocsView(google.picker.ViewId.DOCS)
          .setIncludeFolders(true)
          .setSelectFolderEnabled(false);

        const picker = new google.picker.PickerBuilder()
          .addView(docsView)
          .addView(new google.picker.DocsUploadView())
          .setOAuthToken(token)
          .setOrigin(pickerOrigin)
          .setTitle('اختر وثيقة أو قائمة وجبات من Google Drive — CATERING EGYPT')
          .setCallback((data: any) => {
            if (data.action === google.picker.Action.PICKED && data.docs && data.docs.length > 0) {
              const doc = data.docs[0];
              onFilePicked({
                id: doc.id,
                name: doc.name,
                url: doc.url,
                mimeType: doc.mimeType,
                sizeBytes: doc.sizeBytes,
              });
            }
          })
          .build();

        picker.setVisible(true);
      } catch (err) {
        console.error('Error building Google Picker:', err);
        if (onError) onError(err);
      }
    });
  } catch (error) {
    console.error('Failed to open Google Picker:', error);
    if (onError) onError(error);
  }
};
