
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-clipboard/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/viewpager
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
// @react-native-firebase/analytics
import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/app-check
import io.invertase.firebase.appcheck.ReactNativeFirebaseAppCheckPackage;
// @react-native-firebase/app-distribution
import io.invertase.firebase.appdistribution.ReactNativeFirebaseAppDistributionPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/crashlytics
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsPackage;
// @react-native-firebase/in-app-messaging
import io.invertase.firebase.fiam.ReactNativeFirebaseFiamPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// @react-native-firebase/perf
import io.invertase.firebase.perf.ReactNativeFirebasePerfPackage;
// @react-native-google-signin/google-signin
import com.reactnativegooglesignin.RNGoogleSigninPackage;
// @sentry/react-native
import io.sentry.react.RNSentryPackage;
// react-native-background-timer
import com.ocetnik.timer.BackgroundTimerPackage;
// react-native-code-push
import com.microsoft.codepush.react.CodePush;
// react-native-config
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-exception-handler
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fbsdk-next
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-file-logger
import com.betomorrow.rnfilelogger.FileLoggerPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-hash
import com.drazail.RNHash.RnHashPackage;
// react-native-image-marker
import com.jimmydaddy.imagemarker.ImageMarkerPackage;
// react-native-keychain
import com.oblador.keychain.KeychainPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-network-info
import com.pusherman.networkinfo.RNNetworkInfoPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-signature-capture
import com.rssignaturecapture.RSSignatureCapturePackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-touch-id
import com.rnfingerprint.FingerprintAuthPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-vnpay-merchant
import com.vnpay.merchant.lib.VnpayMerchantPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// react-native-zalo-kit
import com.reactnativezalokit.ZaloKitPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new ClipboardPackage(),
      new RNDateTimePickerPackage(),
      new NetInfoPackage(),
      new RNCViewPagerPackage(),
      new ReactNativeFirebaseAnalyticsPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAppCheckPackage(),
      new ReactNativeFirebaseAppDistributionPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseCrashlyticsPackage(),
      new ReactNativeFirebaseFiamPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new ReactNativeFirebasePerfPackage(),
      new RNGoogleSigninPackage(),
      new RNSentryPackage(),
      new BackgroundTimerPackage(),
      new CodePush(getResources().getString(com.itel_mobile.R.string.CodePushDeploymentKey), getApplicationContext(), com.itel_mobile.BuildConfig.DEBUG),
      new ReactNativeConfigPackage(),
      new RNDeviceInfo(),
      new ReactNativeExceptionHandlerPackage(),
      new FastImageViewPackage(),
      new FBSDKPackage(),
      new FileLoggerPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new RnHashPackage(),
      new ImageMarkerPackage(),
      new KeychainPackage(),
      new LinearGradientPackage(),
      new RNNetworkInfoPackage(),
      new RNPermissionsPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RSSignatureCapturePackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new FingerprintAuthPackage(),
      new VectorIconsPackage(),
      new VnpayMerchantPackage(),
      new RNCWebViewPackage(),
      new ZaloKitPackage()
    ));
  }
}
