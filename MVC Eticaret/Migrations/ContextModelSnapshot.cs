﻿// <auto-generated />
using System;
using MVC_Eticaret.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MVC_Eticaret.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.14")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MVC_Eticaret.Models.Altkatagoriler", b =>
                {
                    b.Property<int>("AltKatagoriId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AltKatagori")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AltKatagori_Link")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("katagoriId")
                        .HasColumnType("int");

                    b.HasKey("AltKatagoriId");

                    b.ToTable("AltKatagoriler");
                });

            modelBuilder.Entity("MVC_Eticaret.Models.Brands", b =>
                {
                    b.Property<int>("brand_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("brand_Adet")
                        .HasColumnType("int");

                    b.Property<string>("brand_Adi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("brand_Link")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("brand_Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("MVC_Eticaret.Models.Katagoriler", b =>
                {
                    b.Property<int>("katagoriId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Katagori")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KatagoriLink")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("katagoriId");

                    b.ToTable("katagoriler");
                });

            modelBuilder.Entity("MVC_Eticaret.Models.Urunler", b =>
                {
                    b.Property<int>("Urun_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AltKatagoriId")
                        .HasColumnType("int");

                    b.Property<int>("KatagoriId")
                        .HasColumnType("int");

                    b.Property<string>("Urun_Adi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Detay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Durum")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Urun_Fiyat")
                        .HasColumnType("float");

                    b.Property<string>("Urun_Marka")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Urun_Puan")
                        .HasColumnType("float");

                    b.Property<string>("Urun_Renk_1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Renk_2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Renk_3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Renk_4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Renk_5")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Renk_6")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Renk_7")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_5")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_6")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_Resim_7")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Urun_StokDurum")
                        .HasColumnType("bit");

                    b.Property<string>("Urun_Talep_Firma")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urun_WEB_Kimlik")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("urun_OlusturmaTarihi")
                        .HasColumnType("datetime2");

                    b.HasKey("Urun_Id");

                    b.ToTable("Urunler");
                });

            modelBuilder.Entity("MVC_Eticaret.Models.UserProfile", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Mail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId");

                    b.ToTable("UserProfile");
                });
#pragma warning restore 612, 618
        }
    }
}
