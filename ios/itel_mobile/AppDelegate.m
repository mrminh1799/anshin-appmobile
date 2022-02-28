#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
//#import <AppCenterReactNative.h>
//#import <AppCenterReactNativeAnalytics.h>
//#import <AppCenterReactNativeCrashes.h>
#import <CodePush/CodePush.h>
#import <Firebase.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import
#import <ZaloSDK/ZaloSDK.h>
#import "RNFBMessagingModule.h"

#import <CallAppSDK/CallAppInterface.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>


static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif


//  NSDictionary *appProperties = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"itel_mobile"
                                            initialProperties:nil];

  //  rootView.loadingView = nil;
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }


  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [[FBSDKApplicationDelegate sharedInstance] application:application
                             didFinishLaunchingWithOptions:launchOptions];

  [FBSDKApplicationDelegate.sharedInstance initializeSDK]; // <- add this

  [[ZaloSDK sharedInstance] initializeWithAppId:@"4580650277437389007"];



// [AppCenterReactNative register];
// [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
// [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  [RNSplashScreen show];

  [CallAppInterface setHomeViewController:rootViewController];

  return YES;
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)
annotation {
    BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL: url
    sourceApplication:sourceApplication
    annotation:annotation
    ];
    return handled;
}

- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  BOOL facebook =[[FBSDKApplicationDelegate sharedInstance]application:application
                                                               openURL:url
                                                               options:options];

  BOOL zalo =[[ZDKApplicationDelegate sharedInstance] application:application openURL:url options:options];

  if ([url.scheme isEqualToString:@"vnpaycallback"]){
    return YES;
  }

  if(facebook){
    return  facebook;
  }

  return zalo;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  //return [CodePush bundleURL];
#endif
}

@end
