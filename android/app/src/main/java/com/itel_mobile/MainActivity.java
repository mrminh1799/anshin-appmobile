package com.itel_mobile;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.zing.zalo.zalosdk.oauth.ZaloSDK;

import android.content.Intent;
import android.view.Window;
import android.view.WindowManager;

import org.devio.rn.splashscreen.SplashScreen;

import androidx.core.content.ContextCompat;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "itel_mobile";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        ZaloSDK.Instance.onActivityResult(this, requestCode, resultCode, data);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.hide(this);  // here
        super.onCreate(null);
        setColorStatusBar();
    }

    public void setColorStatusBar() {
        Window window = this.getWindow();
        // clear FLAG_TRANSLUCENT_STATUS flag:
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        // add FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS flag to the window
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        // finally change the color
        window.setStatusBarColor(ContextCompat.getColor(this, R.color.status_bar_color));
    }
}
