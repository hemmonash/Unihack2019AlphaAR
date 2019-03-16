using UnityEditor;

public class BundleBuilder : Editor {

    [MenuItem("Assets/Build AssetBundles")]
    static void BuildAllAssetBundles()
    {
        BuildPipeline.BuildAssetBundles(@"C:\Users\VoidDDQ\Desktop\AB", BuildAssetBundleOptions.ChunkBasedCompression, BuildTarget.StandaloneWindows);
    }
}
