cd packages/core/build
dts-bundle --name nib-core --main core/index.d.ts
mv core/nib-core.d.ts index.d.ts
rm -rf core
rm -rf ui