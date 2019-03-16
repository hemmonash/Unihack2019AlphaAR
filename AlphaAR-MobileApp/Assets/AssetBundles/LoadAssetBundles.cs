﻿using UnityEngine;

public class LoadAssetBundles : MonoBehaviour {

    private AssetBundle loadedAssetBundle;
    [SerializeField] private Transform imageTarget;
    [SerializeField] private string path;
    [SerializeField] private string assetName;

    private void Start()
    {
        loadedAssetBundle = AssetBundle.LoadFromFile(path);
    }

    // Use this for initialization
    public void LoadModel () {
        InstantiateObjectFromBundle(assetName);
	}

    private void InstantiateObjectFromBundle(string assetName)
    {
        var prefab = loadedAssetBundle.LoadAsset(assetName);
        ((Transform)prefab).SetParent(imageTarget);
        Instantiate(prefab);
    }
}
