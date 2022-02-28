package com.itel_mobile.ekyc;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.vnptit.idg.sdk.activity.VnptIdentityActivity;
import com.vnptit.idg.sdk.utils.SDKEnum;

import static android.app.Activity.RESULT_OK;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.ACCESS_TOKEN;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.CALL_ADD_FACE;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.CAMERA_FOR_PORTRAIT;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.CHANGE_THEME;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.CHECK_LIVENESS_CARD;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.CHECK_MASKED_FACE;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.DOCUMENT_TYPE;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.LANGUAGE;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.LIVENESS_ADVANCED;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.LIVENESS_FACE;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.LOGO;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.SELECT_DOCUMENT;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.SHOW_DIALOG_SUPPORT;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.SHOW_RESULT;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.SHOW_SWITCH;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.TOKEN_ID;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.TOKEN_KEY;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.VALIDATE_BACK_CARD;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.VALIDATE_FRONT_CARD;
import static com.vnptit.idg.sdk.utils.KeyIntentConstants.VERSION_SDK;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.COMPARE_RESULT;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.INFO_RESULT;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.FRONT_IMAGE;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.LIVENESS_CARD_FRONT_RESULT;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.LIVENESS_CARD_REAR_RESULT;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.REAR_IMAGE;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.PORTRAIT_FAR_IMAGE;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.MASKED_FACE_RESULT;

import java.io.ByteArrayOutputStream;

public class VnptEkycModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext reactContext;

    public VnptEkycModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    private Callback mCallback;

    @Override
    public String getName() {
        return "VnptEkyc";
    }

    @ReactMethod
    public void ekyc(String language, Callback callback) {
        // TODO: Implement some actually useful functionality
        mCallback = callback;
        openEKYC(language);
    }

    private void openEKYC(String language) {
        Intent intent = new Intent(reactContext.getCurrentActivity(), VnptIdentityActivity.class);
        if (intent != null) {
            intent.putExtra(ACCESS_TOKEN, "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYzg5Yjc4OS04Nzk0LTExZWItODY4Yy02N2MwNzFmZWM2MmYiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoiZHV5bnZAaXRlbGVjb20udm4iLCJzY29wZSI6WyJyZWFkIl0sImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0IiwibmFtZSI6ImR1eW52QGl0ZWxlY29tLnZuIiwidXVpZF9hY2NvdW50IjoiZWM4OWI3ODktODc5NC0xMWViLTg2OGMtNjdjMDcxZmVjNjJmIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJqdGkiOiIzYzk4YWE3Ny0wMWMxLTRlOWItYmI4ZC1jZTczYmU3MjVmYmYiLCJjbGllbnRfaWQiOiJhZG1pbmFwcCJ9.O3A3EWsvtr1SkCOhCY57hNBIAwvJtQN3CqumwLhCIW98p5DzBqlGp90xESpEyM5DIWK-GzR5kqPkGJiApxR4fcIgF8g-2XSmLXdenAzOx6YtM7n8vcsu05RbIxevGMAt-Dq_ftprZ-__mOadHPcqY1XEjeu6sul5kZBUq6ydJ7A5rk7PNcm_quhYxrl3g83moU1vIXr33FP6xlgbsKZ4YFCrkT4SeF6J4wHnvLbSEmrcaJILkyKhG3256eSZaSX4OHe5RrsPy71JXPgHHOYwYnbgbOYOCgEiB602GVIZHBuPr5V82EdYW54cmo1KcdPJ3ugrX0XtNpDIFNshQXP3gA");
            intent.putExtra(TOKEN_ID, "c1bb0109-c859-d8c3-e053-5f4fc10ae084");
            intent.putExtra(TOKEN_KEY, "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJQ/HRw9JZBzq4bnE2WyTQtycy5X5x7ZKQbCAEb5xP2ZfNbBhPJbF/+JtD0TVUh7d2rpPWCFdNj5XlwvtPUiBoMCAwEAAQ==");
            intent.putExtra(DOCUMENT_TYPE, SDKEnum.DocumentTypeEnum.IDENTITY_CARD.getValue());
            intent.putExtra(SELECT_DOCUMENT, false);
            intent.putExtra(VERSION_SDK, SDKEnum.VersionSDKEnum.ADVANCED.getValue());
            intent.putExtra(SHOW_RESULT, false);
            intent.putExtra(SHOW_DIALOG_SUPPORT, false);
            intent.putExtra(CAMERA_FOR_PORTRAIT, SDKEnum.CameraTypeEnum.FRONT.getValue());
            intent.putExtra(SHOW_SWITCH, false);
            intent.putExtra(CALL_ADD_FACE, false);
            intent.putExtra(LIVENESS_ADVANCED, true);
            intent.putExtra(CHECK_MASKED_FACE, true);
            intent.putExtra(CHANGE_THEME, true);
            intent.putExtra(LOGO, "itel_logo.png");
            intent.putExtra(CHECK_LIVENESS_CARD, true);
//            intent.putExtra(VALIDATE_BACK_CARD, true);
//            intent.putExtra(VALIDATE_FRONT_CARD, true);
//            intent.putExtra(VALIDATION_RESULT, true);
            intent.putExtra(COMPARE_RESULT, true);

            if ("vi".equalsIgnoreCase(language)) {
                intent.putExtra(LANGUAGE, SDKEnum.LanguageEnum.VIETNAMESE.getValue());
            } else {
                intent.putExtra(LANGUAGE, SDKEnum.LanguageEnum.ENGLISH.getValue());
            }
            reactContext.getCurrentActivity().startActivityForResult(intent, 1);
        }
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == 1) {
            if (resultCode == RESULT_OK) {
                WritableMap resultData = new WritableNativeMap();
                WritableMap status = new WritableNativeMap();
                String strDataInfo = data.getStringExtra(INFO_RESULT);
                String imageFront = data.getStringExtra(FRONT_IMAGE);
                String imageRear = data.getStringExtra(REAR_IMAGE);
                String imagePortrait = data.getStringExtra(PORTRAIT_FAR_IMAGE);
                String validateFont = data.getStringExtra(LIVENESS_CARD_FRONT_RESULT);
                String validateBack = data.getStringExtra(LIVENESS_CARD_REAR_RESULT);
                String validateFace = data.getStringExtra(MASKED_FACE_RESULT);
                status.putString("status", "200");
                resultData.putString("info", strDataInfo);
                resultData.putMap("compare", status);
                resultData.putString("imageFront", paseImage(imageFront));
                resultData.putString("imageBack", paseImage(imageRear));
                resultData.putString("imageFace", paseImage(imagePortrait));
                resultData.putString("validateFont", validateFont);
                resultData.putString("validateFace", validateFace);
                resultData.putString("validateBack", validateBack);
                mCallback.invoke(resultData);
            }
        }
    }

    public String paseImage(String filename) {
        try {
            Bitmap bm = BitmapFactory.decodeFile(filename);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            bm.compress(Bitmap.CompressFormat.JPEG, 100, baos); // bm is the bitmap object
            byte[] byteArrayImage = baos.toByteArray();
            return Base64.encodeToString(byteArrayImage, Base64.DEFAULT);
        } catch (Exception e) {
            return "";
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
