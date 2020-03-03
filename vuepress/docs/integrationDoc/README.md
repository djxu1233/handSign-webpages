# 集成说明

## iOS

本手写签批框架最低支持 iOS9.0，低于 9.0 版本的暂不支持

### 手动集成方式

为了手写签批的保密性质，暂不提供开放 cocoaPods 导入，仅提供手动集成方式

### 准备工作

1、把`MDHandSignSDK.framework`文件夹拖拽到相关项目中。<br>
2、在`MDHandSignSDK.framework`同目录下，导入框架里面的`MDHandSign.bundle`资源包。<br>
3、在项目中，通过 cocopods 引用必须的第三方框架/或者手动导入--`Masonry`框架，项目依赖，否则不能成功运行（`具体导入方式可百度搜索相关方案`）。

<img :src="$withBase('/img/screenshot01.png')" alt="foo">

### 项目配置

1、在`TARGETS`->`Build Settings`中搜索`Other Linker Flags`，并配置添加：`-ObjC` 和 `-all_load`,如图所示：

<img :src="$withBase('/img/screenshot02.png')" alt="foo">

### 补充说明

1、必须框架 `Masonry`
手写签批 SDK 依赖 Masonry 第三方库，需要通过手动或 cocopods 引入该 Masonry 框架，才能正常使用。

2、非必须框架
`FDFullscreenPopGesture`, `1.1` [](https://github.com/forkingdog/FDFullscreenPopGesture)

3、如果项目导入手写签批 SDK 时，运行项目并打上了全局断点时，请选择断点模式为 OC 模式，去除 C 语言的断点，由于 SDK 中使用了 C 的库存在个别断点不能走下去，具体如图所示：

<img :src="$withBase('/img/screenshot03.png')" alt="foo">

<img :src="$withBase('/img/screenshot04.png')" alt="foo">

`如遇到导入SDK后存在个别特殊原因，请及时联系相关的SDK开发人员进行处理`

### 使用方法

在完成了手写签批的 SDK 集成后，即可在相关页面中引用

```
#import <MDHandSignSDK/MDHandSignSDK.h>
```

在需要使用到的地方，直接跳转到手写签批的页面，方法如下：

    MDHandSignVC *mainVC = [[MDHandSignVC alloc] init];
    mainVC.title = @"手写签批";
    mainVC.filePath = sandboxFilePath;
    mainVC.scanStatus = NO;
    [mainVC setSaveSusccePdf:^(NSString *filePath,UIViewController *currentVC) {
            //filePath：签署后的文件路径     currentVC：手写签批的当前控制器
        NSLog(@"filePath = %@",filePath);
    }];
    [self.navigationController pushViewController:mainVC animated:YES];

#### 参数说明

1、需要签署的 pdf 的路径，这个是必传参数

    ///文件路径 -- 必传
    @property (nonatomic, copy) NSString *filePath;

2、该参数是该文件加密后的密钥（该属性暂未生效）

    ///文件加密密码 默认是没有加密密码 - 可为 nil
    @property (nonatomic, copy) NSString *filePassword;

3、该参数为 YES 的时候，在退出手写签批模式后，清空签署过程产生的临时文件; NO：则在退出手写签批模式后不清空产生的临时文件

    ///是否在退出时清空临时文件，YES：清空临时文件 NO:不清空临时文件 --- 默认不清空临时文件
    @property (nonatomic, assign) BOOL clearTempFile;

4、在退出手写签批后，可返回到指定的控制器 如果 returnControllerClass 为空，则返回上一层页面（在回调方法：saveSusccePdf 不生效时可用）

    ///返回到指定的控制器 如果 returnControllerClass 为空，则返回上一层页面
    @property (nonatomic, strong) Class returnControllerClass;

5、进入手写签批控制器时是否是查看状态 YES:查看状态 NO:编辑状态 — 默认为编辑状态

    ///是否是查看状态 YES:查看状态 NO:编辑状态 -- 默认为编辑状态
    @property (nonatomic, assign) BOOL scanStatus;

6、是否是子类控制器 - 继承这个控制器

    ///是否是子类控制器 - 继承这个控制器
    @property (nonatomic, assign) BOOL isSubClass;

7、保存成功的回调,其中 filePath:保存后文件的路径，currentVC 为手写签批当前的控制器

    /**
    保存成功的回调
    */
    @property (nonatomic, copy) void (^saveSusccePdf)(NSString *filePath,UIViewController *currentVC);

### SDK 下载

[iOS 集成 SDK demo 下载](http://git.minstone.com.cn/systemnorm/front-end-development/frontend-project-group/hand-sign-group/sdk/ios-sdk.git "iOS集成demo下载")

### 联系方式

`注：由于文档限制文件大小，暂时无法上传 demo，如需要相关的 demo，可联系 iOS 端手写签批开发者，联系方式如下：`

邹明（zoum@minstone.com.cn）<br>
徐达炯（xudj@minstone.com.cn）

## Android

本手写签批最低支持的 android sdk 版本为 17 即 4.2，低于 4.2 版本的暂不支持

### android studio 集成

1、在工程的 build.gradle 下添加对 objectbox 数据库以及手写签批的一些配置，如：

    buildscript {
        ext.objectboxVersion = '2.3.4'
        dependencies {
    	    classpath 'com.android.tools.build:gradle:3.5.1'
            classpath "io.objectbox:objectbox-gradle-plugin:$objectboxVersion"
        }
    }
    allprojects {
        repositories {
            google()
            jcenter()
            //手写签批仓库地址
            maven {
                url 'http://192.168.0.91:8081/repository/pdfview-release/'
            }
        }
    }

2、为了解决方法数超过 64k 及减小打包时 apk 体积的问题，在 app module 下的 build.gradle 的 defaultConfig 中添加如下配置，同时在 dependencies 下添加手写签批的依赖：

    defaultConfig {
        applicationId "com.albert.testpdf"
        minSdkVersion 17
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        multiDexEnabled true         //解决方法数超过64k问题
        ndk {
    	    //只生成armv7的so，可以减小打包后apk的体积，如果想在其它CPU架构的手机上使用，请自行在这里加上去
            abiFilters 'armeabi-v7a'
        }
    }
    dependencies {
        //手写签批依赖
        implementation 'com.minstone:pdfview:1.0.0'
    }

### 使用方法

1、手写签批 sdk 集成完毕后，如果想要使用，首先需要新建一个继承自 MultiDexApplication 的类，重写其 onCreate 方法，并通过 PdfView.getInstance().init(this)对手签进行初始化，如：

```
public class App extends MultiDexApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        PdfView.getInstance().init(this);
    }
}
```

然后在 AndroidManifest.xml 清单文件中的 application 下对该 App 进行引用

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.albert.pdftest">

    <application
        android:name=".App"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

    </application>

</manifest>
```

2、新建一个 Activity，如 HandWritingActivity 作为承载手写签批的容器，并在其布局中添加一个 FrameLayout，如下：

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activity.HandWritingActivity">

    <FrameLayout
        android:id="@+id/flContainer"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

然后在 HandWritingActivity 中添加如下代码：

```
public class HandWritingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hand_writing);
        //pdf签批文件所在的内部存储地址，需要先将pdf签批文件下载下来
        String pdfUrl = getIntent().getStringExtra(PdfFragment.PDF_URL);
        PdfFragment pdfFragment = new PdfFragment();
		//还需要将获取到的pdfUrl传给PdfFragment进行渲染
        Bundle arg = new Bundle();
        arg.putString(PdfFragment.PDF_URL, pdfUrl);
        pdfFragment.setArguments(arg);
        getSupportFragmentManager().beginTransaction().add(R.id.flContainer, pdfFragment).commit();
    }
}
```

最后在 AndroidManifest.xml 清单文件中注册下该新建的 HandWritingActivity 并为其添加 windowSoftInputMode 属性值为 adjustPan，如：

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.albert.testpdfview">

    <application
        android:name=".App"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:name=".activity.HandWritingActivity"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustPan"/>
    </application>

</manifest>
```

如果想监听手写签批保存成功后或返回的事件，可以通过在 HandWritingActivity 中给 pdfFragment 实例添加回调实现，代码如下：

```
pdfFragment.setOnSignCallback(new ISignCallback() {
    /**
     * 保存
     * @param pdfUrl 保存成功后的pdf路径
     */
    @Override
    public void onSave(String pdfUrl) {
        Log.i("HandWritingActivity", "onSave: pdfUrl="+pdfUrl);
    }

    /**
     * 返回
     */
    @Override
    public void onBack() {
        Log.i("HandWritingActivity", "onBack: ");
    }
});
```

最后你只需要在使用的地方，通过 startActivity 或 startActivityForResult 的方式带上参数直接跳转到 HandWritingActivity 即可，如：

```
String pdfUrl = Environment.getExternalStorageDirectory() + File.separator + "test5.pdf";
Intent intent = new Intent(MainActivity.this, HandWritingActivity.class);
intent.putExtra(PdfFragment.PDF_URL, pdfUrl);
startActivity(intent);
```

### SDK 下载

[android 集成 SDK demo 下载](http://codesync.cn/systemnorm/front-end-development/frontend-project-group/hand-sign-group/hand-sign-demo "android集成demo下载")

### 联系方式

`注：由于文档限制文件大小，暂时无法上传demo，如需要相关的demo，可联系android端手写签批开发者，联系方式如下：`

张金煌（zhangjh@minstone.com.cn）<br>
陈少锋（chenshaof@minstone.com）
