using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class BuildBundle : Editor
{
   [MenuItem("Assets/Create Bundle")]
   static void BuildingBundle()
    {
        BuildPipeline.BuildAssetBundles(@"C:\Users\VoidDDQ\Desktop\AB", BuildAssetBundleOptions.ChunkBasedCompression, BuildTarget.Android);
    }
}
